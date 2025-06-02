import * as React from 'react';
import {ActivityIndicator, FlatList, Image, View} from "react-native";
import {NavigationProp, useNavigation} from "@react-navigation/native";

import {Container, HStack, Text, VStack,} from 'components';
import {Button, Icon, StyleService, useStyleSheet,} from '@ui-kitten/components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import { getDistance } from 'geolib';

import {useLayout} from "../../hooks";
import Images from "../../assets/images";

async function cekLogged() {
    const token         = await AsyncStorage.getItem('pesertaNama');
    return token ? true : false;
};

const PenaltyScreen2 = React.memo(() => {
    const {navigate}    = useNavigation<NavigationProp<AuthenticationStackParamList>>();
    const styles        = useStyleSheet(themedStyles);

    const [nav, setNav] = React.useState('CheckScreen');

    const {height, width, top, bottom}      = useLayout();

    cekLogged().then((result) => {
        if (result) {
            setNav('JadwalListScreen')
        }
    });

    return (
        <Container style={styles.container}>
            <VStack level={"5"}>
                <VStack itemsCenter={true} style={{minHeight: height * 40 / 100}}>
                    <Image
                        style={styles.cover}
                        resizeMode={'cover'}
                        source={Images.exam.penalty}
                    />
                </VStack>
                <VStack level={"1"} ph={30} pt={52} style={{borderTopStartRadius: 40, borderTopEndRadius: 40, zIndex: -1}}>
                    <Text category="h2" marginBottom={24}>Terjadi Pelanggaran!!!</Text>
                </VStack>
            </VStack>

            <HStack justify="flex-start" mh={32} mv={12}>
                <Icon pack="assets" name="bullet_warning"/>
                <Text category={"body"} marginLeft={12}>{'Membuka aplikasi lain saat ujian'}</Text>
            </HStack>

            <HStack justify="flex-start" mh={32} mv={12}>
                <Icon pack="assets" name="bullet_warning"/>
                <Text category={"body"} marginLeft={12}>{'Melihat notifikasi saat ujian'}</Text>
            </HStack>

            <VStack level={"1"} ph={30} pv={40} style={{borderTopStartRadius: 40, borderTopEndRadius: 40, zIndex: -1}}>
                <Text category="h6">Hubungi pengawas untuk untuk mengaktifkan sesi kembali</Text>
            </VStack>

            <Button
                children={'Lanjutkan'}
                status={'primary'}
                style={{marginHorizontal: 22, marginBottom: 16}}
                onPress={() => navigate(nav)}
                title={ 'Lanjutkan' }
            />
            {/*<Button
                children={'Periksa Perangkat'}
                status={'primary'}
                style={{marginHorizontal: 22, marginBottom: 32}}
                onPress={() => navigate('CheckScreen')}
                title={ 'Periksa Perangkat' }
            />*/}
        </Container>
    );
});

export default PenaltyScreen2;

const themedStyles = StyleService.create({
    cover: {
        position: "absolute",
        top: 32,
        zIndex: 100,
    },
    container: {
        flex: 1,
        paddingBottom: 0,
    },
});
