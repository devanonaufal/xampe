import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { HStack, Text } from "components";
import { Button, Card, Icon, Modal, useStyleSheet } from "@ui-kitten/components";

import Moment from 'moment';
import 'moment/locale/id';

interface Props {
    jadwal: Object;
    kosong: Double;
    onPressSubmit(): void;
    onPressCancel(): void;
    visibility: boolean
}

const ModalSubmit = ({ jadwal, kosong = 0, onPressSubmit, onPressCancel, visibility }: Props) => {
    const styles = useStyleSheet(themedStyles);
    const durasi = Moment(jadwal.tanggal + ' ' + jadwal.selesai.padStart(8, 0)).diff(Moment().locale('id'), 'minutes')

    const title = kosong ? `Ada ${kosong} Jawaban Kosong. ` : `Masih Ada Waktu ${durasi} Menit. `;

    const header = () => {
        return (
            <HStack style={styles.header} justify={'center'}>
                <TouchableOpacity style={styles.close} onPress={onPressCancel}>
                    <Icon name={'power'} pack={'assets'} style={styles.iconClose} />
                </TouchableOpacity>
                <Icon name={'alert_warning'} pack={'assets'} style={styles.icon} />
                <Text marginLeft={8} category={'h6'}>{'KONFIRMASI'}</Text>
            </HStack>
        )
    }

    const footer = () => {
        return (
            <HStack pt={16}>
                <Button status={"primary"} onPress={onPressSubmit} style={{ flex: 1, marginEnd: 8 }}>Ya</Button>
                <Button status={"danger"} onPress={onPressCancel} style={{ flex: 1, marginStart: 8 }}>Tidak</Button>
            </HStack>
        )
    }

    return (
        <Modal
            visible={visibility}
            backdropStyle={styles.backdrop}
            onBackdropPress={onPressCancel}
        >
            <Card disabled={true} header={header} style={styles.card} footer={footer}>
                <Text category={'callout'} style={styles.textBody}> {title + 'Yakin untuk mengumpulkan Jawaban?'} </Text>
            </Card>
        </Modal>
    )
}

export default ModalSubmit

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
        padding: 16,
        marginHorizontal: 4
    },
    textBody: {
        textAlign: 'center',
        color: 'color-basic-830',
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