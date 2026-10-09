import React from 'react';
import {Alert, Image, Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQueryClient} from '@tanstack/react-query';
import ScreenFrame from '@components/ScreenFrame';
import {STUDENT} from '@constants/student';
import {COLORS, SPACING} from '@constants/theme';
import {triggerAddHaptic} from '@hooks/useAddHaptic';
import {ShopStackParamList} from '@navigation/ShopStack';
import {Product} from '@services/productApi';
import {useCartStore} from '@stores/cartStore';

type Props = NativeStackScreenProps<ShopStackParamList, 'Detail'>;
export default function DetailScreen({route}: Props): React.JSX.Element {
  const products = useQueryClient().getQueryData<Product[]>(['products']) ?? [];
  const product = products.find(item => item.id === route.params.id);
  const addItem = useCartStore(state => state.addItem);
  if (!product) return <ScreenFrame><Text style={styles.missing}>Không tìm thấy món · {STUDENT.mssv}</Text></ScreenFrame>;
  const add = () => {addItem(product); triggerAddHaptic(); Alert.alert('Đã thêm vào giỏ', `MSSV ${STUDENT.mssv}`);};
  return <ScreenFrame><ScrollView contentContainerStyle={styles.page}>
    <Image source={{uri: product.image}} style={styles.image} resizeMode="contain" />
    <Text style={styles.title}>{product.title}</Text>
    <Text style={styles.price}>{product.price.toLocaleString('vi-VN')} đ</Text>
    <Text style={styles.description}>{product.description}</Text>
    <Pressable style={styles.button} onPress={add}><Text style={styles.buttonText}>Thêm vào giỏ</Text></Pressable>
  </ScrollView></ScreenFrame>;
}
const styles = StyleSheet.create({
  page: {padding: SPACING.lg, paddingBottom: 50}, image: {height: 300, backgroundColor: COLORS.surface, borderRadius: 18},
  title: {fontSize: 23, fontWeight: '800', color: COLORS.text, marginTop: SPACING.lg}, price: {fontSize: 22, fontWeight: '900', color: COLORS.primary, marginVertical: SPACING.md},
  description: {fontSize: 16, lineHeight: 25, color: COLORS.textLight}, button: {height: 54, backgroundColor: COLORS.primary, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginTop: SPACING.lg},
  buttonText: {color: COLORS.surface, fontWeight: '800', fontSize: 16}, missing: {padding: SPACING.xl, color: COLORS.error, textAlign: 'center'},
});
