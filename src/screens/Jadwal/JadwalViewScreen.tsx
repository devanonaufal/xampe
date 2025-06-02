import * as React from "react";
import { ActivityIndicator, Platform } from "react-native";
import { NavigationProp, useNavigation, useIsFocused } from "@react-navigation/native";

import { Container, Content, HStack, Text, VStack } from "components";
import { Button, Icon, Layout, Spinner, StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
import { LoadingControl } from "../ui";

import NetInfo from "@react-native-community/netinfo";

import { jadwalView, sesiSave } from '../../../src/api/jadwal';
import ActionBar from 'screens/ui/ActionBar';
import HtmlText from 'screens/ui/HtmlText';

interface JadwalDProps {
    sesi_status: any;
    selesai: any;
    status: any;
    name: string;
    company: string;
    asesmen: string;
    pelajaran: string;
    kelas: string;
    tanggal: string;
    mulai: string;
    durasi: number;
    ruang: string;
    jumlah_soal: number;
    deskripsi: string;
}
const JadwalViewScreen = props => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();
    const { goBack } = useNavigation();

    const jadwal = props.route?.params?.jadwal;

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

    /*Section 2: Detail Exam*/
    const [isLoading, setLoading] = React.useState(true);
    const [jadwalD, setJadwalD] = React.useState({});

    const isFocused = useIsFocused();

    React.useEffect(() => {
        handleJadwalD();
    }, [isFocused]);

    const refreshJadwalD = () => {
        setLoading(true)
        setJadwalD({});
        handleJadwalD()
    }

    const handleJadwalD = async () => {
        try {
            const response = await jadwalView(jadwal.name);
            if (response && response.message) {
                setJadwalD(response.message);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleSesi = async () => {
        setLoading(true);
        try {
            const response = await sesiSave(jadwalD.sesi, 'Started');

            if (response && response.message) {
                navigate('SoalListScreen', { jadwal: jadwal, sesi: jadwalD.sesi })
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Container>
            <ActionBar network={isConnected} subtitle={jadwal.asesmen + ' / ' + jadwal.pelajaran} showQuit={false} showRefresh={true} onClickRefresh={() => { refreshJadwalD() }} />

            <Content style={[styles.content]}>
                {isLoading ? <ActivityIndicator size="large" /> :
                    (Object.keys(jadwalD).length) ? (
                        <VStack>
                            <HStack justify={'flex-start'} mb={16}>
                                <Layout style={{ padding: 8, borderRadius: 8, backgroundColor: theme['color-basic-810'], marginEnd: 8 }}>
                                    <Icon name={'list'} pack={'assets'} />
                                </Layout>
                                <VStack>
                                    <Text category={'h6'}>{jadwalD.jumlah_soal}</Text>
                                    <Text category={'subhead'}>Jumlah Soal</Text>
                                </VStack>
                            </HStack>
                            <HStack justify={'flex-start'} mb={24}>
                                <Layout style={{ padding: 8, borderRadius: 8, backgroundColor: theme['color-basic-810'], marginEnd: 8 }}>
                                    <Icon name={'timer'} pack={'assets'} />
                                </Layout>
                                <VStack>
                                    <Text category={'h6'}>{jadwalD.durasi} Menit</Text>
                                    <Text category={'subhead'}>Waktu Mengerjakan</Text>
                                </VStack>
                            </HStack>
                            <HtmlText text={jadwalD.deskripsi} />
                        </VStack>
                    ) : (
                        <VStack padding={16} level={"3"} mb={16} style={{ borderRadius: 16 }}>
                            <LoadingControl text={"Tidak ada jadwal ujian"} onClickRefresh={() => { refreshJadwalD() }} />
                        </VStack>
                    )
                }
            </Content>
            <VStack style={styles.footer}>
                <Button
                    children={'Mulai'}
                    status={'primary'}
                    style={{ marginHorizontal: 22, marginBottom: 16, marginTop: 30 }}
                    onPress={() => handleSesi()}
                    disabled={(Object.keys(jadwalD).length) ? false : true}
                    title={isLoading ? (<ActivityIndicator />) : 'Mulai'}
                />
                <Button
                    children={'Kembali'}
                    status={'primary'}
                    style={{ marginHorizontal: 22, marginBottom: 32 }}
                    onPress={() => goBack()}
                    appearance={'outline'}
                    disabled={isLoading ? true : false}
                    title={isLoading ? (<ActivityIndicator />) : 'Kembali'}
                />
            </VStack>
        </Container>
    );
}

export default JadwalViewScreen;

const themedStyles = StyleService.create({
    content: {
        paddingHorizontal: 30,
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