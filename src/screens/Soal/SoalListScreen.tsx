import * as React from "react";
import { ActivityIndicator, View, Alert, AppState, PanResponder, AppStateStatus, Dimensions, Keyboard, BackHandler, Platform } from "react-native";
import { NavigationProp, useNavigation, useIsFocused } from "@react-navigation/native";

import { Container, Content, Text, VStack } from "components";
import { Button, StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
import NetInfo from "@react-native-community/netinfo";

import * as Device from 'expo-device';

import { LoadingControl } from "../ui";
import { useLayout } from "../../hooks";

import Card from "./List/Card";
import ModalSubmit from "./List/ModalSubmit";

import { soalList } from '../../../src/api/soal';
import { sesiSave } from '../../../src/api/jadwal';
import { logSave } from '../../../src/api/log';

import ActionBar from 'screens/ui/ActionBar';
import { HomeStackParamList } from "navigation/navigation-types";

const SoalListScreen = (props: { route: { params: { jadwal: any; sesi: any; }; }; }) => {

    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const { height, width } = useLayout();
    const vWidth = width * 0.9;

    const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();

    const jadwal = props.route?.params?.jadwal;
    const sesi = props.route?.params?.sesi;

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
    //       onMoveShouldSetPanResponder:() => true,
    //         onPanResponderMove: (evt, gestureState) => {
    //         if(gestureState.y0 < 20 && !penalty) {
    //             handleExamLog('Swipe Down: Status Bar')
    //             console.log('PELANGGARAN2A! ');
    //         } else if(gestureState.y0 > (height - 20) && !penalty) {
    //             // handleExamLog('Swipe Up: Menu Navigasi')
    //             // console.log('PELANGGARAN2B! ');
    //         }

    //         // if(gestureState.x0 < 5 && !penalty) {
    //         //     handleExamLog('Swipe Left: Shortcut Potential')
    //         //     console.log('PELANGGARAN3A! ');
    //         // } else if(gestureState.x0 > (width - 5) && !penalty) {
    //         //     handleExamLog('Swipe Right: Shortcut Potential')
    //         //     console.log('PELANGGARAN3B! ');
    //         // }
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
    const [soals, setSoals] = React.useState([]);
    const [sesiView, setSesiView] = React.useState(false);
    const [kosong, setKosong] = React.useState(0);

    const isFocused = useIsFocused();

    React.useEffect(() => {
        handleSoals();
    }, [isFocused]);

    const refreshSoals = () => {
        setLoading(true)
        setSoals([]);
        handleSoals()
    }

    const handleSoals = async () => {
        try {
            const response = await soalList(sesi);
            if (response && response.message) {
                setSoals(response.message);

                let sum = response.message.length;
                response.message.map((item, j) => {
                    sum = sum - item.lengkap
                })

                setKosong(sum);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleSesi = async () => {
        setLoading(true);
        setSesiView(false);
        try {
            const response = await sesiSave(sesi, 'Collected');

            if (response && response.message) {
                navigate('JadwalListScreen')
            } else {
                Alert.alert('Gagal Mengumpulkan Jawaban', 'Periksa Koneksi Anda')
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            Alert.alert('Gagal Mengumpulkan Jawaban', 'Periksa Koneksi Anda')
        }
    };

    return (
        // <Container style={Platform.OS === 'ios' ? null : {flex: 1}} {...(Platform.OS === 'ios' ? null : panResponder.panHandlers)}>
        <Container style={Platform.OS === 'ios' ? null : { flex: 1 }}>
            <ActionBar network={isConnected} subtitle={jadwal.asesmen + ' / ' + jadwal.pelajaran} showQuit={false} showRefresh={true} onClickRefresh={() => { refreshSoals() }} />

            <Content style={[styles.content]} nestedScrollEnabled={true}>
                {isLoading ? <ActivityIndicator size="large" /> :
                    soals.length ? (
                        <View style={{ flexDirection: 'row', vWidth, flexWrap: 'wrap', flex: 1, paddingBottom: 120 }}>
                            {soals.map((item, j) => { return <Card jadwal={jadwal} soal={item} sesi={sesi} soals={soals} key={item.name} /> })}
                        </View>
                    ) : (
                        <Text style={{ textAlign: 'center' }}>{'Tidak ada soal ujian, Silahkan Refresh'}</Text>
                    )
                }
            </Content>

            <VStack style={styles.footer}>
                <Button
                    children={'Kirim Jawaban'}
                    status={"primary"}
                    style={{ marginHorizontal: 22, marginBottom: 30, marginTop: 30 }}
                    onPress={() => setSesiView(true)}
                    disabled={soals.length ? false : true}
                    title={isLoading ? (<ActivityIndicator />) : 'Kirim Jawaban'}
                />
            </VStack>

            <ModalSubmit type={'1'} visibility={sesiView} jadwal={jadwal} kosong={kosong} onPressSubmit={() => { handleSesi() }} onPressCancel={() => setSesiView(false)} />

        </Container>
    )
}

export default SoalListScreen;

const themedStyles = StyleService.create({
    content: {
        flexGrow: 1,
        paddingHorizontal: '5%',
        paddingVertical: 20
    },
    footer: {
        backgroundColor: '#F1F1FA',
        borderColor: "#1F1F1F33",
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderWidth: 1
    },
});
