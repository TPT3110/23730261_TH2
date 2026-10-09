import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {STUDENT_LINE, VARIANT} from '@constants/student';
import {COLORS} from '@constants/theme';

export default function Watermark(): React.JSX.Element {
  return <View style={[styles.wrap, VARIANT.watermarkAtTop ? styles.top : styles.bottom]} pointerEvents="none">
    <Text style={styles.text} numberOfLines={1}>{STUDENT_LINE}</Text>
  </View>;
}
const styles = StyleSheet.create({
  wrap: {position: 'absolute', left: 0, right: 0, zIndex: 20, alignItems: 'center'},
  top: {top: 3}, bottom: {bottom: 3},
  text: {fontSize: 10, fontWeight: '700', color: COLORS.textLight, opacity: 0.8},
});
