import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import ScreenFrame from '@components/ScreenFrame';
import {ROOM_LABEL, VARIANT} from '@constants/student';
import {COLORS, SPACING} from '@constants/theme';
import {totalAmount, useCartStore} from '@stores/cartStore';

export default function CartScreen(): React.JSX.Element {
  const items = useCartStore(state => state.items);
  const amount = useCartStore(totalAmount);
  const fee = useCartStore(state => state.shippingFee);
  const changeQty = useCartStore(state => state.changeQty);
  const removeItem = useCartStore(state => state.removeItem);
  return <ScreenFrame><View style={styles.page}>
    <Text style={styles.heading}>GIỎ HÀNG</Text>
    <FlatList data={items} keyExtractor={item => item.id} contentContainerStyle={items.length ? styles.list : styles.emptyList}
      ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng đang trống. Hãy chọn món ở Cửa hàng.</Text>}
      renderItem={({item}) => <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} resizeMode="contain" />
        <View style={styles.info}><Text style={styles.title} numberOfLines={2}>{item.title}</Text><Text style={styles.price}>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</Text>
          <View style={styles.actions}><Pressable style={styles.qty} onPress={() => changeQty(item.id, -1)}><Text>−</Text></Pressable><Text style={styles.count}>{item.quantity}</Text><Pressable style={styles.qty} onPress={() => changeQty(item.id, 1)}><Text>+</Text></Pressable><Pressable onPress={() => removeItem(item.id)}><Text style={styles.remove}>Xóa</Text></Pressable></View>
        </View>
      </View>} />
    <View style={styles.summary}>
      <View style={styles.row}><Text>Tiền hàng</Text><Text style={styles.value}>{amount.toLocaleString('vi-VN')} đ</Text></View>
      <Text style={styles.room}>Giao đến {ROOM_LABEL}</Text>
      <View style={styles.row}><Text>Phí ship</Text><Text style={styles.ship}>{fee === null ? 'Chưa ước tính phí — mở tab Tôi' : `${fee.toLocaleString('vi-VN')} đ (công thức ${VARIANT.shipFormula})`}</Text></View>
      <View style={styles.row}><Text style={styles.totalLabel}>Tổng cộng</Text><Text style={styles.total}>{(amount + (fee ?? 0)).toLocaleString('vi-VN')} đ</Text></View>
    </View>
  </View></ScreenFrame>;
}
const styles = StyleSheet.create({
  page: {flex: 1, padding: SPACING.md}, heading: {fontSize: 18, color: COLORS.surface, fontWeight: '900', textAlign: 'center', backgroundColor: COLORS.primary, marginHorizontal: -SPACING.md, marginTop: -SPACING.md, marginBottom: SPACING.md, paddingVertical: 14}, list: {paddingBottom: SPACING.md}, emptyList: {flexGrow: 1, justifyContent: 'center'}, empty: {textAlign: 'center', color: COLORS.textLight},
  item: {flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.sm, marginBottom: SPACING.sm}, image: {width: 76, height: 76}, info: {flex: 1, marginLeft: SPACING.sm}, title: {fontWeight: '700', color: COLORS.text}, price: {color: COLORS.primary, fontWeight: '800', marginVertical: 5},
  actions: {flexDirection: 'row', alignItems: 'center'}, qty: {width: 30, height: 28, borderRadius: 8, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center'}, count: {marginHorizontal: SPACING.sm, fontWeight: '700'}, remove: {color: COLORS.error, marginLeft: SPACING.md, fontWeight: '700'},
  summary: {backgroundColor: COLORS.surface, padding: SPACING.md, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border}, row: {flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4}, value: {fontWeight: '700'}, room: {color: COLORS.textLight, marginVertical: 4}, ship: {color: COLORS.secondary, fontWeight: '800', flex: 1, textAlign: 'right'}, totalLabel: {fontWeight: '900', color: COLORS.text}, total: {fontWeight: '900', color: COLORS.primary, fontSize: 18},
});
