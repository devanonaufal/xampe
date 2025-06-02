import * as React from 'react';
import { ActivityIndicator, FlatList, Image, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { Container, HStack, Text, VStack } from 'components';
import { Button, Icon, StyleService, useStyleSheet, } from '@ui-kitten/components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import { getDistance } from 'geolib';

import { AuthenticationStackParamList } from "../../navigation/navigation-types";

import { useLayout } from "../../hooks";
import Images from "../../assets/images";

import { appSetting } from '../../api/login';

declare module 'expo-device' {
    export const isDeviceModified: boolean;
}

//get free memory space
async function getFreeSpace() {
    try {
        const info = await FileSystem.getFreeDiskStorageAsync();
        if (info >= 2000000000) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

// async function getTargetLocation() {
//     try {
//         const response = await appSetting();

//         if (response && response.message) {
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 return false;
//             }

//             let userLocation = await Location.getCurrentPositionAsync({});
//             let distance = getDistance(
//                 { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude },
//                 response.message.location
//             );

//             if(distance <= response.message.distance) {
//                 return true;
//             }
//             return false;
//         }else {
//             console.log('GET SETTING FAIL', response);
//             return false;
//         }
//     } catch (error) {
//         console.log('GET SETTING CATCH', response);
//         return false;
//     }
// };

async function cekLogged() {
    const token = await AsyncStorage.getItem('pesertaNama');
    return token ? true : false;
};

async function cekVersion() {
    try {
        const response = await appSetting();

        if (response && response.message) {

            return response.message.versions.includes('2.2.3-android') ? true : false;
        } else {
            console.log('GET SETTING FAIL', response);
            return false;
        }
    } catch (error) {
        console.log('GET SETTING CATCH', response);
        return false;
    }

    return false;
};

const CheckScreen2 = React.memo(() => {
    const { navigate } = useNavigation<NavigationProp<AuthenticationStackParamList>>();
    const styles = useStyleSheet(themedStyles);

    const [nav, setNav] = React.useState('LoginScreen');

    const { height, width, top, bottom } = useLayout();

    const [loadingState1, setLoadingState1] = React.useState(true);
    const [loadingState2, setLoadingState2] = React.useState(true);
    // const [loadingState3, setLoadingState3] = React.useState(true);
    const [loadingState4, setLoadingState4] = React.useState(true);

    const [cekState1, setCekState1] = React.useState(false);
    const [cekState2, setCekState2] = React.useState(false);
    // const [cekState3, setCekState3]         = React.useState(false);
    const [cekState4, setCekState4] = React.useState(false);

    if (loadingState1) {
        getFreeSpace().then((result) => {
            if (result) {
                setCekState1(true)
                setLoadingState1(false)
            } else {
                setCekState1(false)
                setLoadingState1(false)
            }
        });
    }

    if (loadingState2) {
        cekLogged().then((result) => {
            if (result) {
                setNav('JadwalListScreen')
            }
        });

        if (Device.isDeviceModified) {
            setCekState2(false) //perangkat sudah dimod(root,custom rom, dsb)
            setLoadingState2(false)
        } else {
            setCekState2(true)
            setLoadingState2(false)
        }
    }

    // if(loadingState3) {
    //     getTargetLocation().then((result) => {
    //         if (!result) {
    //             setCekState3(false)
    //             setLoadingState3(false)
    //         }else {
    //             setCekState3(true)
    //             setLoadingState3(false)
    //         }
    //     });
    // }

    if (loadingState4) {
        cekVersion().then((result) => {
            if (result) {
                setCekState4(true)
                setLoadingState4(false)
            } else {
                setCekState4(false)
                setLoadingState4(false)
            }
        });
    }

    return (
        <Container style={styles.container}>
            <VStack level={"5"}>
                <VStack itemsCenter={true} style={{ minHeight: height * 40 / 100 }}>
                    <Image
                        style={styles.cover}
                        resizeMode={'cover'}
                        source={Images.exam.texting}
                    />
                </VStack>
                <VStack level={"1"} ph={30} pt={52} style={{ borderTopStartRadius: 40, borderTopEndRadius: 40, zIndex: -1 }}>
                    <Text category="h2" marginBottom={24}>Memeriksa Perangkat ...</Text>
                </VStack>
            </VStack>

            <HStack justify="flex-start" mh={32} mv={12}>
                {loadingState4 ? <ActivityIndicator /> :
                    cekState4 ? <Icon pack="assets" name="radio_active" /> :
                        <Icon pack="assets" name="bullet_warning" />
                }
                <Text category={"body"} marginLeft={12}>{' Halo'}</Text>
            </HStack>

            {/*<HStack justify="flex-start" mh={32} mv={12}>
                { loadingState3 ? <ActivityIndicator/> : 
                    cekState3 ? <Icon pack="assets" name="radio_active"/> :
                        <Icon pack="assets" name="bullet_warning"/>
                }
                <Text category={"body"} marginLeft={12}>{'Berada di lokasi Sekolah'}</Text>
            </HStack>*/}

            <HStack justify="flex-start" mh={32} mv={12}>
                {loadingState2 ? <ActivityIndicator /> :
                    cekState2 ? <Icon pack="assets" name="radio_active" /> :
                        <Icon pack="assets" name="bullet_warning" />
                }
                <Text category={"body"} marginLeft={12}>{'Halo'}</Text>
            </HStack>

            <HStack justify="flex-start" mh={32} mv={12}>
                {loadingState1 ? <ActivityIndicator /> :
                    cekState1 ? <Icon pack="assets" name="radio_active" /> :
                        <Icon pack="assets" name="bullet_warning" />
                }
                <Text category={"body"} marginLeft={12}>{'Halo'}</Text>
            </HStack>

            <Button
                children={'Lanjutkan'}
                style={styles.button}
                // disabled={!(cekState1 && cekState2 && cekState3 && cekState4)}
                disabled={!(cekState1 && cekState2 && cekState4)}
                onPress={() => {
                    navigate(nav);
                }}
            />
        </Container>
    );
});

export default CheckScreen2;

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
    button: {
        position: 'absolute',
        left: 32,
        right: 32,
        bottom: 32,
    },
});
