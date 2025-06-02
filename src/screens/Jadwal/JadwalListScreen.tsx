import * as React from 'react';
import { ActivityIndicator, AppState, Platform, TouchableOpacity } from "react-native";
import { useIsFocused } from '@react-navigation/native';

import { Container, Content, HStack, Text, VStack } from 'components';
import { Layout, StyleService, useStyleSheet, useTheme, } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { jadwalList } from '../../../src/api/jadwal';
import { LoadingControl } from "../ui";

import NetInfo from "@react-native-community/netinfo";

import Filter from './List/Filter';
import Card from './List/Card';

import Moment from 'moment';
import 'moment/locale/id';
import ActionBar from 'screens/ui/ActionBar';
import CardEmpty from "./List/CardEmpty";

const JadwalListScreen = React.memo(() => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const now = Moment().locale('id');

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

            });
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    /*Section 2: Identitas*/
    const [pesertaNama, setPesertaNama] = React.useState('');
    const [pesertaNomor, setPesertaNomor] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            setPesertaNama(await AsyncStorage.getItem('pesertaNama'));
            setPesertaNomor(await AsyncStorage.getItem('pesertaNomor'));
        };
        fetchData();
    }, []);

    /*Section 3: CURRENT EXAM*/
    const [isLoadingCurrent, setLoadingCurrent] = React.useState(true);
    const [jadwal, setJadwal] = React.useState({});

    const refreshJadwalCurrent = () => {
        setLoadingCurrent(true)
        setJadwal({});
        handleCurrent()
    }

    const handleCurrent = async () => {
        try {
            let filters = 'berlangsung_e=' + now.format('Y-MM-DD HH:mm:ss');

            const response = await jadwalList(filters);

            if (response && response.message && response.message.length) {
                setJadwal(response.message[0]);
            }
            setLoadingCurrent(false);
        } catch (error) {
            console.log(error);
            setLoadingCurrent(false);
        }
    };


    /*Section 4: LIST EXAMS*/
    const [filterJadwal, setFilterJadwal] = React.useState<number>(0);
    const [isLoadingAll, setLoadingAll] = React.useState(true);
    const [jadwals, setJadwals] = React.useState([]);

    // const switchLoading = (loadingState) => loadingState ? setLoadingAll(false) : setLoadingAll(true);
    const isFocused = useIsFocused();

    React.useEffect(() => {
        setLoadingAll(true)
        setJadwals([]);
        setFilterJadwal(0)
        handleAll(0)
        handleCurrent();
    }, [isFocused]);

    const refreshJadwalAll = (filter) => {
        setLoadingAll(true)
        setJadwals([]);
        setFilterJadwal(filter)
        handleAll(filter)
    }

    const handleAll = async (filter) => {
        try {
            var filters = '';

            if (!filter) {
                filters = 'selesai_gt=' + now.format('Y-MM-DD HH:mm:ss');
            } else {
                filters = 'selesai_lt=' + now.format('Y-MM-DD HH:mm:ss');
            }

            const response = await jadwalList(filters);

            if (response && response.message) {
                setJadwals(response.message);
            }
            setLoadingAll(false);
        } catch (error) {
            console.log(error);
            setLoadingAll(false);
        }
    };

    return (
        <Container style={{ flex: 1 }}>
            <ActionBar network={isConnected} />

            <Content style={styles.content} nestedScrollEnabled={true}>

                <VStack mb={20}>
                    <HStack justify={"flex-start"} mb={20}>
                        <Text>Selamat Datang, </Text>
                        <Text style={{ fontWeight: 'bold' }}>{pesertaNama}</Text>
                    </HStack>

                    {/*AREA CURRENT UJIAN*/}

                    {(
                        (Object.keys(jadwal).length) ? (<Card jadwal={jadwal} />)
                            :
                            (<CardEmpty isLoading={isLoadingCurrent} type={'head'} onClickRefresh={() => {
                                refreshJadwalCurrent()
                            }} />)
                    )}

                    <HStack style={{ alignItems: "center" }} mt={24} mb={8}>
                        <Text category={"h5"} style={{ fontWeight: 'bold' }}>Jadwal Ujian</Text>
                        <Filter
                            style={{ minWidth: 150 }}
                            selectedIndex={filterJadwal}
                            onChange={(data) => {
                                refreshJadwalAll(data);
                            }}
                        />
                    </HStack>
                </VStack>

                {(
                    jadwals.length ?
                        <VStack style={{ paddingBottom: 120 }}>
                            {jadwals.map((item, j) => {
                                return <Card jadwal={item} key={item.name} />
                            })}
                        </VStack>
                        :
                        <CardEmpty isLoading={isLoadingAll} type={'body'} onClickRefresh={() => {
                            refreshJadwalAll(filterJadwal)
                        }} />
                )}
            </Content>

        </Container>
    );
});

export default JadwalListScreen;

const themedStyles = StyleService.create({
    content: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    scheduleStatus: {
        alignSelf: "stretch",
        borderRadius: 16,
        alignItems: 'center',
        paddingVertical: 6,
        marginTop: 12,
        backgroundColor: 'background-warning-color'
    },
    scheduleCardRefresh: {
        borderRadius: 16, paddingVertical: 32
    },
    cardScheduleBody: {
        backgroundColor: "color-basic-810", borderColor: "color-basic-700", borderWidth: 1
    },
});


