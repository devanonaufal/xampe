import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const soalList = async (name: string) => {
  try {
    const token     = await AsyncStorage.getItem('pesertaToken');
    let controller  = new AbortController()

    const response = await fetch(`https://smpn13malang.akademika.id/api/method/soalList?sesi=${name ?? ''}`, {
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
export {soalList};

const soalView = async (sesi: string, soal: string) => {
  try {
    const token     = await AsyncStorage.getItem('pesertaToken');
    let controller  = new AbortController()

    const response = await fetch(`https://smpn13malang.akademika.id/api/method/soalView?sesi=${sesi ?? ''}&soal=${soal ?? ''}`, {
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
export {soalView};

const jawabSave = async (sesi: string, soal: string, answer, start: string, end: string) => {
  try {
    const token     = await AsyncStorage.getItem('pesertaToken');
    let controller  = new AbortController()

    const response = await fetch(`https://smpn13malang.akademika.id/api/method/jawabSave`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'akademikapp': 'SMPN13-EXAM-2.0.0',
        'akademikasesi': token,
      },
      body: JSON.stringify({
        sesi: sesi,
        soal: soal,
        jawaban: answer,
        start: start,
        end: end,
      }),
      timeout: 3000
    });
    
    const data = await response.json();
    console.log('data', data)

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
export {jawabSave};

