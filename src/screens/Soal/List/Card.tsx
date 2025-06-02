import {TouchableOpacity} from "react-native";
import {Text, VStack} from "components";
import {StyleService, useStyleSheet} from "@ui-kitten/components";

import {NavigationProp, useNavigation} from "@react-navigation/native";
import {ExamStackParamList} from "../../../navigation/navigation-types";

interface Props {
    jadwal: any;
    soal: any;
    sesi: any;
    soals: any;
    onPress?: void;
}
const Card = ({jadwal, soal, sesi, soals, onPress}) => {
    const {navigate}    = useNavigation<NavigationProp<ExamStackParamList>>();
    const styles        = useStyleSheet(themedStyles);
    
    return (
        <TouchableOpacity onPress={() => {navigate('SoalViewScreen', { jadwal:jadwal, soal:soal.name, sesi:sesi, soals:soals })}} style={ soal.lengkap == 1 ? styles.containerDone : (soal.lengkap == 0 ? styles.container : styles.containerPartial ) } padding={8}> 
            <Text style={styles.colorTextTitle} category={'c2'}>Soal</Text>
            <Text style={styles.colorTextBody} category={'h5'}>{soal.nomor}</Text>
        </TouchableOpacity>
    )
}

export default Card;

const themedStyles = StyleService.create({
    container: {
        alignItems: 'center', minHeight: 50, width: '16.6%', margin: '1.5%',
        backgroundColor: 'darkgrey',
        borderRadius: 16,
    },
    containerPartial: {
        alignItems: 'center', minHeight: 50, width: '16.6%', margin: '1.5%',
        backgroundColor: 'color-warning-100',
        borderRadius: 16,
    },
    containerDone: {
        alignItems: 'center', minHeight: 50, width: '16.6%', margin: '1.5%',
        backgroundColor: 'color-success-100',
        borderRadius: 16,
    },
    colorTextTitle: {
        paddingTop: 10,
        color: 'color-basic-1100'
    },
    colorTextBody: {
        paddingBottom: 10,
        color: 'color-basic-1100'
    },
})