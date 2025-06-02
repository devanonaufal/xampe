import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logSave = async (aktivitas: string,  perangkat: string | null, koneksi: string) => {
  try {
    const token     = await AsyncStorage.getItem('pesertaToken');
    const versi     = await AsyncStorage.getItem('appVersi');
    let controller  = new AbortController()

    const response = await fetch(`https://smpn13malang.akademika.id/api/method/logSave`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'akademikapp': 'SMPN13-EXAM-2.0.0',
        'akademikasesi': token,
      },
      body: JSON.stringify({
        versi: versi,
        aktivitas: aktivitas,
        perangkat: perangkat,
        koneksi: koneksi,
      }),
      timeout: 3000
    });
    
    const data = await response.json();

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
export {logSave};

