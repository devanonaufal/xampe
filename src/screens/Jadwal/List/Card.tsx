import { HStack, Text, VStack } from "components";
import { Icon, Layout, StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../navigation/navigation-types";

import Moment from 'moment';
import 'moment/locale/id';

interface JadwalProps {
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

const Card = React.memo(({ jadwal }: { jadwal: JadwalProps }) => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();
    const now = Moment().locale('id');
    var mulai = Moment(jadwal.tanggal + ' ' + jadwal.mulai.padStart(8, 0));
    var selesai = Moment(jadwal.tanggal + ' ' + jadwal.selesai.padStart(8, 0));

    var isOpen = 0;

    if (mulai.isBefore(now) && selesai.isAfter(now)) {
        isOpen = 1
    }

    return (
        <VStack padding={16} level={"3"} mb={16} style={isOpen ? styles.cardActive : styles.cardNormal} onPress={() => {
            (isOpen && jadwal.sesi_status == 'Opened') ? navigate('JadwalViewScreen', { jadwal: jadwal }) : Alert.alert('Ujian tidak dapat diakses', 'Silahkan hubungi pengawas / panitia Ujian untuk info lebih lanjut')
        }}>
            <Text category={'c1'} style={isOpen ? styles.textActive : styles.textNormal}>{jadwal.asesmen}</Text>
            <Text category={'h4'} style={isOpen ? styles.textActive : styles.textNormal}>{jadwal.pelajaran}</Text>
            <HStack mt={6}>
                <VStack>
                    <HStack justify={"flex-start"} mb={4}>
                        <Icon pack="assets" name="calendar" style={isOpen ? styles.iconActive : styles.iconNormal} />
                        <Text category={'c2'} style={isOpen ? styles.textActive : styles.textNormal}>{jadwal.tanggal}</Text>
                    </HStack>
                    <HStack justify={"flex-start"} mb={4}>
                        <Icon pack="assets" name="clock_afternoon" style={isOpen ? styles.iconActive : styles.iconNormal} />
                        <Text category={'c2'} style={isOpen ? styles.textActive : styles.textNormal}>{jadwal.mulai}-{jadwal.selesai}</Text>
                    </HStack>
                    {/*<HStack justify={"flex-start"} mb={4}>
                        <Icon pack="assets" name="location" style={isOpen ? styles.iconActive : styles.iconNormal }/>
                        <Text category={'c2'} style={isOpen ? styles.textActive : styles.textNormal }>{jadwal.ruang}</Text>
                    </HStack>*/}
                </VStack>

                <Layout style={jadwal.sesi_status == 'Collected' ? styles.cardStatusSuccess : (jadwal.sesi_status == 'Started' ? styles.cardStatusWarning : styles.cardStatus)} level={'5'}>
                    <Text style={{ color: theme['color-basic-1100'] }} category={'c2'}>{jadwal.sesi_status}</Text>
                </Layout>
            </HStack>
        </VStack>
    )
})

export default Card;

const themedStyles = StyleService.create({
    cardNormal: {
        backgroundColor: 'color-basic-810',
        borderRadius: 16, borderColor: 'color-basic-700', borderWidth: 1,
    },
    cardActive: {
        backgroundColor: 'color-primary-100',
        borderRadius: 16, borderColor: 'color-primary-100', borderWidth: 1,
    },
    iconActive: {
        width: 10,
        height: 10,
        marginEnd: 6,
        tintColor: 'color-basic-1100',
    },
    iconNormal: {
        width: 10,
        height: 10,
        marginEnd: 6,
        tintColor: 'color-basic-200',
    },
    textActive: {
        color: 'color-basic-1100',
    },
    textNormal: {
        color: 'color-basic-200',
    },
    cardStatusSuccess: {
        backgroundColor: 'color-success-100',
        alignSelf: "flex-end",
        borderRadius: 16,
        minWidth: '35 %',
        alignItems: 'center',
        paddingVertical: 4,
        marginBottom: 8
    },
    cardStatusWarning: {
        backgroundColor: 'color-danger-100',
        alignSelf: "flex-end",
        borderRadius: 16,
        minWidth: '35 %',
        alignItems: 'center',
        paddingVertical: 4,
        marginBottom: 8
    },
    cardStatus: {
        backgroundColor: 'color-basic-700',
        alignSelf: "flex-end",
        borderRadius: 16,
        minWidth: '35 %',
        alignItems: 'center',
        paddingVertical: 4,
        marginBottom: 8
    },
})