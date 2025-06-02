import * as React from "react";
import { TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';

import { Select, SelectItem, StyleService, useStyleSheet } from "@ui-kitten/components";

interface Props {
  soal;
  opsi;
  pairs;
  selected;
  onOptionPress(): void;
}
const Mapping = ({ soal, opsi, pairs, selected, onOptionPress }: Props) => {
  const styles = useStyleSheet(themedStyles);

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16 * 0.7);
  const imageWidth = Math.round(dimensions.width * 0.7);

  const setAnswers = (item, pasangan) => {

    let jwbn = [];
    selected.forEach(ma => {
      if (ma[0] == item) {
        jwbn.push([item, pasangan]);
      } else {
        jwbn.push(ma);
      }
    });
    onOptionPress(JSON.stringify(jwbn))
  };

  return opsi.map((item, index) => {
    return (
      <View key={soal + '-' + index} style={selected[index][1] ? styles.optionActive : styles.option}>
        {!(item.url) ? <Text category='h6' style={{ paddingHorizontal: 15, paddingVertical: 15 }}>{item.item}</Text> : <Image style={{ height: imageHeight, width: imageWidth, padding: 15 }} resizeMode={'contain'} source={{ uri: item.item }} />}
        <Select key={soal + '-' + index + '-SS'} value={selected[index][1]} style={{ width: '100%' }} onSelect={value => setAnswers(item.item, pairs[value.row].pasangan)}>
          {
            pairs.map((item2, index2) => {
              return <SelectItem key={soal + '-' + index + '-SS' + index2} title={item2.pasangan} value={item2.pasangan} />
            })
          }
        </Select>
      </View>
    )
  })
}
export default Mapping;

const themedStyles = StyleService.create({
  option: {
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: 12,
    borderColor: 'background-basic-color-5',
    borderWidth: 1,
    marginBottom: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    paddingBottom: 20,
  },
  optionActive: {
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: 12,
    borderColor: 'background-basic-color-5',
    borderWidth: 1,
    marginBottom: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    paddingBottom: 20,
    color: 'color-primary-700',
    backgroundColor: 'color-primary-700',
  },
});
