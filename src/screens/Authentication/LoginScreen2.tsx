import * as React from 'react';
import {Button, Input, StyleService, useStyleSheet,CheckBox} from '@ui-kitten/components';
import {Container, Text, VStack, HStack} from 'components';
import {ActivityIndicator,Image,Alert, TouchableOpacity, Linking} from "react-native";
import Images from "../../assets/images";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {HomeStackParamList} from "../../navigation/navigation-types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pesertaLogin } from '../../api/login';

const LoginScreen2 = React.memo(() => {
    const styles        = useStyleSheet(themedStyles);
    const {navigate}    = useNavigation<NavigationProp<HomeStackParamList>>();

    const [peserta, setpeserta]             = React.useState('');
    const [token, setoken]                  = React.useState('');
    const [term, seterm]                    = React.useState(0);
    const [loadingState, setLoadingState]   = React.useState(false);

    const handleLogin   = async () => {
        setLoadingState(true)
        try {
            const response = await pesertaLogin(peserta,token);
          
            if (response && response.message) {
                navigate('JadwalListScreen')
                setLoadingState(false)
            }else{
                Alert.alert('Gagal Login', 'Periksa Kembali Nomor Ujian dan Koneksi Anda')
                setLoadingState(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleTerm = () => {
        Linking.openURL('https://thunderlab.id/akademika-privacy');
    };

    return (
        <Container style={{flex: 1}}>
            <KeyboardAwareScrollView
                extraScrollHeight={100}
                enableOnAndroid={true}
                snapToEnd={true}
            >
                <VStack level={"5"}>
                    <VStack itemsCenter={true} pt={5}>
                        <Image
                            resizeMode={'cover'}
                            source={Images.exam.achievement}
                        />
                    </VStack>
                    <VStack level={"1"} ph={30} pt={30} style={{borderTopStartRadius: 40, borderTopEndRadius: 40}}>
                        <Text category="h2" marginBottom={20}>Login Ujian</Text>
                        <Text category="c2" marginBottom={12} textAlign="justify">Siswa diwajibkan menutup semua aplikasi background terutama yang mengkonsumsi penggunaan RAM dan menonaktifkan semua notifikasi dari layanan perpesanan.</Text>
                        <Text category="c2" marginBottom={20} textAlign="justify">Untuk kelancaran Ujian, disarankan untuk menggunakan aplikasi VPN seperti Intra.</Text>
                        <Input
                            status="basic"
                            size="giant"
                            style={styles.input}
                            value={peserta}
                            placeholder={"Nomor Peserta"}
                            onChangeText={setpeserta}
                        />
                        <HStack mt={16}></HStack>
                        <Input
                            status="basic"
                            size="giant"
                            style={styles.input}
                            value={token}
                            placeholder={"Token Peserta"}
                            onChangeText={setoken}
                        />
                        <HStack mt={16}>
                            <CheckBox
                              checked={term}
                              onChange={nextChecked => seterm(nextChecked)}
                            >
                                <HStack>
                                    <Text category="subhead">Saya setuju dengan </Text>
                                    <TouchableOpacity onPress={handleTerm}> 
                                        <Text category="subhead" underline="1">Kebijakan Privasi</Text>
                                    </TouchableOpacity>
                                </HStack>
                            </CheckBox>
                            
                        </HStack>
                        <HStack mt={16}></HStack>
                    </VStack>
                </VStack>
            </KeyboardAwareScrollView>
            <Button
                children={'Login'}
                style={styles.button}
                onPress={handleLogin}
                disabled={(peserta == '' || token == '' || term == 0 || loadingState)}
                title={ loadingState ? (<ActivityIndicator/>) : 'Login' }
            />
        </Container>
    );
});

export default LoginScreen2;

const themedStyles = StyleService.create({
    input: {
        borderRadius: 16,
        zIndex: 100,
    },
    button: {
        marginHorizontal: 32,
        marginBottom: 32,
    },
});