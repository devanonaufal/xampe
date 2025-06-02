import {Card, Icon, Modal, useStyleSheet} from "@ui-kitten/components";
import {StyleSheet, TouchableOpacity} from "react-native";
import {HStack, Text} from "components";
import React from "react";

interface Props {
    level: string;
    visibility: boolean;
    onChangeVisibility?: (visibility: boolean)=> void;
}

const ModalAlert = ({
    level,
    onChangeVisibility,
    visibility}: Props) => {

    const styles = useStyleSheet(themedStyles);

    const _onChangeVisibility = React.useCallback(
    (visible: boolean) => {
        if (onChangeVisibility) {
            onChangeVisibility(visible);
        }
    },
    [onChangeVisibility],
  );

    const alertType = () => {
        switch (level) {
            case '1': return {alert:'alert_warning', title:'Gagal Logout!', body:'Periksa Kembali Koneksi Anda'}
            case '2': return {alert:'alert_warning', title:'Ujian tidak dapat diakses', body:'Silahkan hubungi pengawas / panitia ujian untuk penjadwalan ujian susulan'}
            case 'p': return {alert:'alert_success', title:'Telah Menyelesaikan Ujian', body:'Hasil ujian akan diumumkan panitia ujian'}
            case 'o': return {alert:'alert_warning', title:'Tidak Mengikuti Ujian', body:'Silahkan hubungi panitia ujian untuk penjadwalan ujian susulan'}
            case 'i': return {alert:'alert_warning', title:'Koneksi Terputus', body:'Pastikan koneksi, kemudian refresh page. Jika masih berlanjut, hubungi panitia'}
            case 'u': return {alert:'alert_warning', title:'Peringatan!', body:'Demi kelancaran ujian status bar dan navigasi dinonaktifkan'}
            case 'y': return {alert:'alert_danger', title:'Pelanggaran!', body:'Dilarang keluar menggunakan aplikasi lain selama ujian berlangsung'}
            case 't': return {alert:'alert_danger', title:'Pelanggaran!', body:'Silahkan hubungi panitia ujian untuk membuka kembali sesi Ujian'}
            case 'r': return {alert:'alert_warning', title:'Ujian tidak dapt diakses', body:'Silahkan hubungi pengahawas / panitia ujian untuk info lebih lanjut'}
        }
    }

    const header = () => {
        return (<HStack style={styles.header} justify={'center'}>
            <TouchableOpacity style={styles.close} onPress={() => _onChangeVisibility(false)}>
                <Icon name={'close'} pack={'assets'} style={styles.iconClose}/>
            </TouchableOpacity>
            <Icon name={alertType().alert} pack={'assets'} style={styles.icon}/>
            <Text marginLeft={8} category={'h5'}>{alertType().title}</Text>
        </HStack>)
    }

    return (
        <Modal
        visible={visibility}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => _onChangeVisibility(false)}>
            <Card disabled={true} header={header} style={styles.card} >
                <Text category={'callout'} style={styles.textBody}>{alertType().body}</Text>
            </Card>
        </Modal>
    )
}

export default ModalAlert;

const themedStyles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    icon: {
        width: 20,
        height: 20,
    },
    header: {
        padding: 10,
        paddingHorizontal: 42
    },
    card: {
        borderRadius: 24,
        padding: 8,
        marginHorizontal: 4
    },
    textBody: {
        textAlign: 'center',
        color: '#91919F',
    },
    close: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 8
    },
    iconClose: {
        width: 16,
        height: 16,
    },

})