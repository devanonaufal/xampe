import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const jadwalList = async (query: string) => {
  try {
    const token     = await AsyncStorage.getItem('pesertaToken');
    let controller  = new AbortController()

    const response = await fetch(`https://smpn13malang.akademika.id/api/method/jadwalList?${query ?? ''}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'akademikapp': 'SMPN13-EXAM-2.0.0',
        'akademikasesi': token,
      },
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
export {jadwalList};

const jadwalView = async (name: string) => {
  try {
    const token     = await AsyncStorage.getItem('pesertaToken');
    let controller  = new AbortController()

    const response = await fetch(`https://smpn13malang.akademika.id/api/method/jadwalView?jadwal=${name ?? ''}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'akademikapp': 'SMPN13-EXAM-2.0.0',
        'akademikasesi': token,
      },
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
export {jadwalView};

const sesiSave = async (sesi: string, status_ujian: string) => {
  try {
    const token     = await AsyncStorage.getItem('pesertaToken');
    let controller  = new AbortController()

    const response = await fetch(`https://smpn13malang.akademika.id/api/method/sesiSave`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'akademikapp': 'SMPN13-EXAM-2.0.0',
        'akademikasesi': token,
      },
      body: JSON.stringify({
        sesi: sesi,
        status_ujian: status_ujian,
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
export {sesiSave};

