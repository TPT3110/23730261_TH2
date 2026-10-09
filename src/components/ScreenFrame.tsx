import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '@constants/theme';
import Watermark from './Watermark';

export default function ScreenFrame({children}: PropsWithChildren): React.JSX.Element {
  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
    <View style={styles.content}>{children}</View><Watermark />
  </SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1, backgroundColor: COLORS.background}, content: {flex: 1}});
