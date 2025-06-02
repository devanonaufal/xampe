import * as React from 'react';
import { ActivityIndicator, Alert, FlatList, Image, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { Container, HStack, Text, VStack } from 'components';
import { Button, Icon, StyleService, useStyleSheet, } from '@ui-kitten/components';


import { AuthenticationStackParamList } from "../../navigation/navigation-types";

import { useLayout } from "../../hooks";
import Images from "../../assets/images";

import { appSetting } from '../../api/login';

declare module 'expo-device' {
    export const isDeviceModified: boolean;
}



const CheckScreen = React.memo(() => {
    const { navigate } = useNavigation<NavigationProp<AuthenticationStackParamList>>();
    const styles = useStyleSheet(themedStyles);

    const [nav, setNav] = React.useState('LoginScreen');

    const { height, width, top, bottom } = useLayout();

    const [loadingState1, setLoadingState1] = React.useState(true);
    const [loadingState2, setLoadingState2] = React.useState(true);
    // const [loadingState3, setLoadingState3] = React.useState(true);
    const [loadingState4, setLoadingState4] = React.useState(true);

    const [cekState1, setCekState1] = React.useState(true);
    const [cekState2, setCekState2] = React.useState(true);
    // const [cekState3, setCekState3]         = React.useState(false);
    const [cekState4, setCekState4] = React.useState(true);


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
                    cekState4 ? <Icon pack="assets" name="alert_success" /> :
                        <Icon pack="assets" name="alert_warning" />
                }
                <Text category={"body"} marginLeft={12}>{'Halo'}</Text>
            </HStack>

            {/*<HStack justify="flex-start" mh={32} mv={12}>
                { loadingState3 ? <ActivityIndicator/> : 
                    cekState3 ? <Icon pack="assets" name="alert_success"/> :
                        <Icon pack="assets" name="alert_warning"/>
                }
                <Text category={"body"} marginLeft={12}>{'Berada di lokasi Sekolah'}</Text>
            </HStack>*/}

            <HStack justify="flex-start" mh={32} mv={12}>
                {loadingState2 ? <ActivityIndicator /> :
                    cekState2 ? <Icon pack="assets" name="alert_success" /> :
                        <Icon pack="assets" name="alert_warning" />
                }
                <Text category={"body"} marginLeft={12}>{'Halo'}</Text>
            </HStack>

            <HStack justify="flex-start" mh={32} mv={12}>
                {loadingState1 ? <ActivityIndicator /> :
                    cekState1 ? <Icon pack="assets" name="alert_success" /> :
                        <Icon pack="assets" name="alert_warning" />
                }
                <Text category={"body"} marginLeft={12}>{'Halo'}</Text>
            </HStack>

            <Button
                children={'Lanjutkan'}
                style={styles.button}
                // disabled={!(cekState1 && cekState2 && cekState3 && cekState4)}
                disabled={!(cekState1 && cekState2 && cekState4)}
                // disabled={!(cekState2 && cekState4)}
                onPress={() => {
                    navigate(nav);
                }}
            />
        </Container>
    );
});

export default CheckScreen;

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
