import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, SPACING} from '@constants/theme';
import {Product} from '@services/productApi';

type Props = {product: Product; onPress: () => void; onAdd: () => void};
export default function ProductCard({product, onPress, onAdd}: Props): React.JSX.Element {
  return <Pressable style={styles.card} onPress={onPress}>
    <Image source={{uri: product.image}} style={styles.image} resizeMode="contain" />
    <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
    <View style={styles.footer}>
      <Text style={styles.price}>{product.price.toLocaleString('vi-VN')} đ</Text>
      <Pressable style={styles.add} onPress={event => {event.stopPropagation(); onAdd();}} hitSlop={8}>
        <Text style={styles.addText}>+</Text>
      </Pressable>
    </View>
  </Pressable>;
}
const styles = StyleSheet.create({
  card: {flex: 1, margin: SPACING.sm, padding: SPACING.sm, minHeight: 250, borderRadius: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border},
  image: {height: 130, width: '100%', backgroundColor: COLORS.surface},
  title: {minHeight: 44, marginTop: SPACING.sm, color: COLORS.text, fontWeight: '700', lineHeight: 20},
  footer: {marginTop: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  price: {flex: 1, color: COLORS.primary, fontWeight: '800', fontSize: 14},
  add: {width: 34, height: 34, borderRadius: 17, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center'},
  addText: {color: COLORS.surface, fontSize: 24, lineHeight: 27, fontWeight: '700'},
});
