import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://smpn13malang.akademika.id/api/method/';

const appSetting = async () => {
  try {
    const response = await fetch(`https://smpn13malang.akademika.id/api/method/appSetting`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'akademikapp': 'SMPN13-EXAM-2.0.0',
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('Error Login', response);
    }
    // else {
    //   await AsyncStorage.setItem('appVersi', data.message.versi);
    // }
    await AsyncStorage.setItem('appVersi', '2.2.3-android');

    return data;
  } catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      throw error;
    }
  };
};
export {appSetting};

const pesertaLogin = async (peserta: string, token: string) => {
  try {
    const response = await fetch(`https://smpn13malang.akademika.id/api/method/pesertaLogin`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'akademikapp': 'SMPN13-EXAM-2.0.0',
      },
      body: JSON.stringify({
        peserta,
        token,
      }),
    });

    const data = await response.json();

    if (response.ok && data.message) {
      await AsyncStorage.setItem('pesertaNama', data.message.nama);
      await AsyncStorage.setItem('pesertaNomor', data.message.nomor);
      await AsyncStorage.setItem('pesertaAsesmen', data.message.asesmen);
      await AsyncStorage.setItem('pesertaToken', data.message.sesi);
    } else {
      console.log('pesertaLogin Error', data);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      throw error;
    }
  };
};
export {pesertaLogin};

const pesertaLogout = async () => {
  try {
    const token     = await AsyncStorage.getItem('pesertaToken');
    const response  = await fetch(`https://smpn13malang.akademika.id/api/method/pesertaLogout`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'akademikapp': 'SMPN13-EXAM-2.0.0',
        'akademikasesi': token,
      }
    });

    const data = await response.json();

    if (response.ok && data.message) {
      await AsyncStorage.setItem('pesertaNama', '');
      await AsyncStorage.setItem('pesertaNomor', '');
      await AsyncStorage.setItem('pesertaAsesmen', '');
      await AsyncStorage.setItem('pesertaToken', '');
    } else {
      await AsyncStorage.setItem('pesertaNama', '');
      await AsyncStorage.setItem('pesertaNomor', '');
      await AsyncStorage.setItem('pesertaAsesmen', '');
      await AsyncStorage.setItem('pesertaToken', '');
      console.log('pesertaLogout Error', data);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      throw error;
    }
  };
};
export {pesertaLogout};