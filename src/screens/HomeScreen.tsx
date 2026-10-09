import React, {useMemo, useState} from 'react';
import {ActivityIndicator, Image, Pressable, RefreshControl, StyleSheet, Text, TextInput, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenFrame from '@components/ScreenFrame';
import ProductCard from '@components/ProductCard';
import {BANNER_IMAGE_ID, DEBOUNCE_MS, ROOM_LABEL, STUDENT} from '@constants/student';
import {COLORS, SPACING} from '@constants/theme';
import {useDebouncedValue} from '@hooks/useDebouncedValue';
import {triggerAddHaptic} from '@hooks/useAddHaptic';
import {ShopStackParamList} from '@navigation/ShopStack';
import {useProductsQuery} from '@services/productApi';
import {useCartStore} from '@stores/cartStore';

type Props = NativeStackScreenProps<ShopStackParamList, 'Home'>;
export default function HomeScreen({navigation}: Props): React.JSX.Element {
  const [search, setSearch] = useState('');
  const keyword = useDebouncedValue(search, DEBOUNCE_MS).trim().toLowerCase();
  const {data = [], isPending, isError, refetch, isRefetching} = useProductsQuery();
  const addItem = useCartStore(state => state.addItem);
  const filtered = useMemo(() => data.filter(item => item.title.toLowerCase().includes(keyword)), [data, keyword]);
  const add = (item: typeof data[number]) => {addItem(item); triggerAddHaptic();};
  return <ScreenFrame>
    <FlashList data={filtered} numColumns={2} keyExtractor={item => `${STUDENT.mssv}-${item.id}`}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => {void refetch();}} colors={[COLORS.primary]} />}
      ListHeaderComponent={<View>
        <View style={styles.header}><View><Text style={styles.brand}>KTXGO</Text><Text style={styles.room}>Giao tận {ROOM_LABEL}</Text></View></View>
        <Image source={{uri: `https://picsum.photos/id/${BANNER_IMAGE_ID}/800/240`}} style={styles.banner} />
        <TextInput style={styles.search} value={search} onChangeText={setSearch} placeholder={`Tìm món (debounce ${DEBOUNCE_MS}ms) - ${STUDENT.mssv}`} placeholderTextColor={COLORS.textLight} />
        <Text style={styles.section}>Món dành cho bạn</Text>
        {isPending && <View style={styles.state}><ActivityIndicator size="large" color={COLORS.primary} /><Text style={styles.loadingText}>Đang tải món...</Text></View>}
        {isError && <View style={styles.state}><Text style={styles.errorMssv}>{STUDENT.mssv}</Text><Text style={styles.error}>Không tải được dữ liệu món.</Text><Pressable style={styles.retry} onPress={() => refetch()}><Text style={styles.retryText}>Thử lại</Text></Pressable></View>}
        {!isPending && !isError && filtered.length === 0 && <Text style={styles.empty}>Không có món phù hợp.</Text>}
      </View>}
      renderItem={({item}) => <ProductCard product={item} onAdd={() => add(item)} onPress={() => navigation.navigate('Detail', {id: item.id})} />}
      contentContainerStyle={styles.content} />
  </ScreenFrame>;
}
const styles = StyleSheet.create({
  content: {paddingHorizontal: SPACING.sm, paddingBottom: SPACING.lg},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.md, marginHorizontal: -SPACING.sm, backgroundColor: COLORS.primary},
  brand: {fontSize: 24, fontWeight: '900', color: COLORS.surface}, room: {color: COLORS.surface, marginTop: 2},
  banner: {height: 115, marginHorizontal: SPACING.sm, borderRadius: 16},
  search: {height: 48, margin: SPACING.sm, paddingHorizontal: SPACING.md, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface, color: COLORS.text},
  section: {fontSize: 20, fontWeight: '800', color: COLORS.text, marginHorizontal: SPACING.sm, marginTop: SPACING.sm},
  state: {padding: SPACING.xl, alignItems: 'center'}, loadingText: {color: COLORS.text, fontWeight: '700', marginTop: SPACING.md}, errorMssv: {color: COLORS.error, fontWeight: '900'}, error: {color: COLORS.text, textAlign: 'center', fontWeight: '700', marginTop: SPACING.xs},
  retry: {backgroundColor: COLORS.primary, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: 10, marginTop: SPACING.md}, retryText: {color: COLORS.surface, fontWeight: '700'},
  empty: {padding: SPACING.xl, textAlign: 'center', color: COLORS.textLight},
});
