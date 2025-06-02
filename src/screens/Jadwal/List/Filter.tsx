import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Layout, useTheme} from '@ui-kitten/components';
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue, withSpring,} from 'react-native-reanimated';

import Text from 'components/Text';

const data = ['Pending', 'Berakhir'];

interface Props {
  style?: ViewStyle;
  disabled?: boolean;
  selectedIndex: number;
  onChange(index: number): void;
}

const Filter = ({style, selectedIndex, disabled, onChange}: Props) => {
  const theme = useTheme();
  const transX = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(0);

  React.useEffect(() => {
    transX.value = widthItem * selectedIndex;
  }, [selectedIndex, transX, widthItem]);

  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      transX.value,
      [0, widthItem * 1],
      [theme['background-basic-color-5'], theme['background-basic-color-5']],
    );

    return {
      transform: [
        {
          translateX: withSpring(transX.value, {
            stiffness: 200,
            damping: 19,
          }),
        },
      ],
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Layout level="2" style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.boxAni,
          animatedStyles,
          {width: `${100 / data.length}%`},
        ]}
        onLayout={({nativeEvent}) => setWidthItem(nativeEvent.layout.width)}
      />
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.btn}
            key={index}
            disabled={disabled}
            onPress={() => onChange(index)}>
            <Text
              capitalize
              category="c1"
              status={selectedIndex === index ? 'white' : 'primary'}
              textAlign="center"
              >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Layout>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    height: 38,
    borderRadius: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  boxAni: {
    height: 38,
    position: 'absolute',
    borderRadius: 24,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
