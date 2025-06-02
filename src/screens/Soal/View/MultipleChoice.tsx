import * as React from "react";
import { TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import { StyleService, useStyleSheet } from "@ui-kitten/components";

interface Props {
  opsi;
  selected;
  onOptionPress(): void;
}
const MultipleChoice = ({ opsi, selected, onOptionPress }: Props) => {
  const styles = useStyleSheet(themedStyles);

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16 * 0.7);
  const imageWidth = Math.round(dimensions.width * 0.7);

  return opsi.map((item, index) => {
    return (
      <TouchableOpacity key={index} style={styles.buttonOption} onPress={() => { onOptionPress(JSON.stringify([item.item])) }}>
        <View style={selected.length && selected.includes(item.item) ? styles.optionActive : styles.option}>
          {!(item.url) ? <Text category='h6' style={{ paddingHorizontal: 15 }}>{item.item}</Text> : <Image style={{ height: imageHeight, width: imageWidth, padding: 15 }} resizeMode={'contain'} source={{ uri: item.item }} />}
        </View>
      </TouchableOpacity>
    )
  })
}
export default MultipleChoice;

const themedStyles = StyleService.create({
  buttonOption: { borderRadius: 30, marginBottom: 20, maxWidth: '100%' },
  option: {
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: 12,
    borderColor: 'background-basic-color-5',
    borderWidth: 1,
  },
  optionActive: {
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: 12,
    borderColor: 'background-basic-color-5',
    borderWidth: 1,
    color: 'color-primary-700',
    backgroundColor: 'color-primary-700',
  }
});
