import * as React from "react";

import { ActivityIndicator, View, AppState, PanResponder, AppStateStatus, Dimensions, Keyboard, Platform, Alert } from "react-native";
import { NavigationProp, useNavigation, useIsFocused } from "@react-navigation/native";

import { Container, Content, HStack, Text, VStack } from "components";
import { Button, Icon, Spinner, StyleService, useStyleSheet } from "@ui-kitten/components";
import NetInfo from "@react-native-community/netinfo";

import * as Device from 'expo-device';

import { LoadingControl } from "../ui";
import { useLayout } from "../../hooks";

import Mapping from "./View/Mapping";
import MultipleChoice from "./View/MultipleChoice";

import { soalView, jawabSave } from '../../../src/api/soal';
import { logSave } from '../../../src/api/log';

import Moment from 'moment';
import 'moment/locale/id';

import ActionBar from 'screens/ui/ActionBar';
import HtmlText from 'screens/ui/HtmlText';
import { HomeStackParamList } from "navigation/navigation-types";

const SoalViewScreen = (props: { route: { params: { jadwal: any; sesi: any; soals: any; soal: any; }; }; }) => {
    const styles = useStyleSheet(themedStyles);
    const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();
    const { height, width } = useLayout();

    const jadwal = props.route?.params?.jadwal;
    const sesi = props.route?.params?.sesi;
    const soals = props.route?.params?.soals;

    const [soal, setSoal] = React.useState(props.route?.params?.soal);
    // const soal      = props.route?.params?.soal;

    /*Section 0: Log Apps*/
    const [penalty, setPenalty] = React.useState(0);

    const [perangkat, setPerangkat] = React.useState(Device.manufacturer);
    const [koneksi, setKoneksi] = React.useState(String);
    const [appSt, setAppSt] = React.useState(AppState.currentState);

    const handleExamLog = async (penaltyType) => {
        setLoading(true)
        setPenalty(1)
        try {
            const response = await logSave(penaltyType, perangkat, koneksi);
            if (response && response.message) {
                navigate('PenaltyScreen')
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };

    /*0.1. Pelanggaran Background Apps*/
    const [appStateStatus, setAppStateStatus] = React.useState(AppState.currentState);
    React.useEffect(() => {
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (appStateStatus.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App has come to the foreground!');
            } else if (appStateStatus === 'active' && nextAppState.match(/inactive|background/)) {
                console.log('App has gone to the background!');
                handleExamLog('Keluar dari aplikasi')
            }
            setAppStateStatus(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, [appStateStatus]);

    /*0.2. Pelanggaran Open Bar*/
    // const panResponder = React.useRef(
    //     PanResponder.create({
    //         /*DISABLE KARENA PERFORMANCE*/
    //         onMoveShouldSetPanResponder:() => true,
    //         onPanResponderMove: (evt, gestureState) => {
    //         if(gestureState.y0 < 20 && !penalty) {
    //             handleExamLog('Swipe Down: Status Bar')
    //             console.log('PELANGGARAN2A! ');
    //         } 
    //       },
    //     })
    // ).current;

    /*0.3. Pelanggaran Split Screen / Pop Screen*/
    const windowDimensions = Dimensions.get('window');
    const screenDimensions = Dimensions.get('screen');

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (screenDimensions.height * 0.75 > windowDimensions.height && !penalty) {
                handleExamLog('Resize Height: Split/Pop Screen Potential')
                console.log('PELANGGARAN3A! ');
            }
            if (screenDimensions.width * 0.95 > windowDimensions.width && !penalty) {
                handleExamLog('Resize Width: Split/Pop Screen Potential')
                console.log('PELANGGARAN3B! ');
            }
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    /*0.4. Pelanggaran Keyboard Open*/
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            if (!penalty) {
                handleExamLog('Opened Keyboard: Pop Screen/Shortcut Potential')
                console.log('PELANGGARAN4! ');
            }
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    /*Section 1: Indicator Online*/
    const [isConnected, setIsConnected] = React.useState(75);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            NetInfo.fetch().then(state => {
                if (Platform.OS === 'ios') {
                    setIsConnected(state.isConnected * 99);
                } else if (Platform.OS === 'android') {
                    setIsConnected(state.details.strength);
                }
                setKoneksi(state.type + ' - ' + state.details.ipAddress + ' - ' + state.details.strength)
            });
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    /*Section 2: List Soal*/
    const [isLoading, setLoading] = React.useState(true);
    const [soalD, setSoalD] = React.useState({});
    const [start, setStart] = React.useState('');

    const [prev, setPrev] = React.useState({});
    const [next, setNext] = React.useState({});

    const [initMA, setInitMA] = React.useState({});

    const isFocused = useIsFocused();

    React.useEffect(() => {
        handleSoalD(soal);
    }, [isFocused]);

    const refreshSoalD = (sname) => {
        setLoading(true)
        setSoalD({});
        handleSoalD(sname);
    }

    const handleSoalD = async (sname) => {
        try {
            const response = await soalView(sesi, sname);
            if (response && response.message) {
                setSoalD(response.message);

                if (response.message.menjodohkan.length) {
                    let jwbn = []
                    let real = response.message.jawaban ? JSON.parse(response.message.jawaban) : []

                    response.message.menjodohkan.forEach((ma, idx) => {
                        if (real[idx] !== undefined) {
                            jwbn.push(real[idx]);
                        } else {
                            jwbn.push([ma.item, '']);
                        }
                    });

                    setInitMA(jwbn);
                }
                setStart(Moment().locale('id').format('Y-MM-DD HH:mm:ss'));
                cekNav(response.message.soal.nomor - 1);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const [refreshDisabled, setRefreshDisabled] = React.useState(false);
    const handleJawab = async (answer) => {
        if (!refreshDisabled) {
            // Disable the refresh button
            setRefreshDisabled(true);

            // Call your refresh logic here
            setLoading(true);
            try {
                let end = Moment().locale('id').format('Y-MM-DD HH:mm:ss');
                const response = await jawabSave(sesi, soal, answer, start, end);

                if (response && response.message) {
                    refreshSoalD(soal)
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }

            // Set a cooldown period of 5 seconds
            setTimeout(() => {
                // Enable the refresh button after the cooldown
                setRefreshDisabled(false);
            }, 3000);
        } else {
            // Display an alert if the button is on cooldown
            Alert.alert('Loading...Mengirim Jawaban!');
        }

    };

    const cekNav = async (idx) => {
        setPrev({})
        setNext({})
        try {
            let pidx = idx - 1;
            let nidx = idx + 1;

            if (soals && soals[pidx] !== undefined) {
                setPrev(soals[pidx])
            }

            if (soals && soals[nidx] !== undefined) {
                setNext(soals[nidx])
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        // <Container style={Platform.OS === 'ios' ? null : {flex: 1}} {...(Platform.OS === 'ios' ? null : panResponder.panHandlers)}>
        <Container style={Platform.OS === 'ios' ? null : { flex: 1 }}>
            <ActionBar network={isConnected} subtitle={jadwal.asesmen + ' / ' + jadwal.pelajaran} showQuit={false} showRefresh={true} onClickRefresh={() => { refreshSoalD(soal) }} />

            <Content style={[styles.content]} nestedScrollEnabled={true}>
                {isLoading ? <ActivityIndicator size="large" /> :
                    (Object.keys(soalD).length && soalD.soal) ? (
                        <VStack>
                            <HStack style={styles.navigation}>
                                <Button disabled={Object.keys(prev).length ? false : true} size={"small"} accessoryLeft={isLoading ? <Spinner /> : <Icon name={'caret_left'} pack={'assets'} />} style={{ borderRadius: 8 }} onPress={() => { setSoal(prev.name); refreshSoalD(prev.name); }} />
                                <Text category={'h3'}>Nomor {soalD.soal.nomor}</Text>
                                <Button disabled={Object.keys(next).length ? false : true} size={"small"} accessoryLeft={isLoading ? <Spinner /> : <Icon name={'caret_right'} pack={'assets'} />} style={{ borderRadius: 8 }} onPress={() => { setSoal(next.name); refreshSoalD(next.name); }} />
                            </HStack>
                            <VStack>
                                <HtmlText text={soalD.soal.pertanyaan} />

                                {soalD.soal.jenis == 'Pilihan Ganda' ?
                                    <MultipleChoice opsi={soalD.pilihan_ganda} selected={soalD.jawaban ? JSON.parse(soalD.jawaban) : []} onOptionPress={answer => { handleJawab(answer) }} />
                                    :
                                    <Mapping soal={soalD.soal.name} opsi={soalD.menjodohkan} pairs={soalD.jodoh} selected={initMA} onOptionPress={answer => { handleJawab(answer) }} />
                                }
                            </VStack>
                        </VStack>
                    ) : (
                        <VStack padding={16} level={"3"} mb={16} style={{ borderRadius: 16 }}>
                            <Text style={{ textAlign: 'center' }}>{'Tidak ada soal ujian, Silahkan Refresh'}</Text>
                            {/* onClickRefresh={() => { refreshSoalD(soal) }} */}
                        </VStack>
                    )
                }
            </Content>
            <VStack style={styles.footer}>
                <Button
                    children={'Semua Soal'}
                    status={"primary"}
                    style={{ marginHorizontal: 22, marginBottom: 30, marginTop: 30 }}
                    onPress={() => navigate('SoalListScreen', { jadwal: jadwal, sesi: sesi })}
                    disabled={soals.length ? false : true}
                    title={isLoading ? (<ActivityIndicator />) : 'Semua Soal'}
                />
            </VStack>
        </Container>
    )
}

export default SoalViewScreen;

const themedStyles = StyleService.create({
    content: {
        flexGrow: 1,
        paddingHorizontal: '5%',
        paddingVertical: 20
    },
    navigation: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    footer: {
        backgroundColor: '#F1F1FA',
        borderColor: "#1F1F1F33",
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderWidth: 1
    },
});