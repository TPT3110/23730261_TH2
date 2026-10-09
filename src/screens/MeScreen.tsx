import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import ScreenFrame from '@components/ScreenFrame';
import {examStamp, ROOM_LABEL, STUDENT} from '@constants/student';
import {COLORS, SPACING} from '@constants/theme';
import {useCampusLocation} from '@hooks/useCampusLocation';
import {useAuthStore} from '@stores/authStore';
import {useCartStore} from '@stores/cartStore';

export default function MeScreen(): React.JSX.Element {
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);
  const fee = useCartStore(state => state.shippingFee);
  const distance = useCartStore(state => state.distanceKm);
  const {status, message, requestLocation, openSettings} = useCampusLocation();
  return <ScreenFrame><View style={styles.page}>
    <Text style={styles.heading}>TÔI · LOCATION</Text>
    <View style={styles.card}>
      <Text style={styles.name}>{STUDENT.hoTen}</Text><Text style={styles.meta}>MSSV: {STUDENT.mssv}</Text><Text style={styles.meta}>Stamp: #{examStamp()}</Text><Text style={styles.meta}>Token: {token?.slice(0, 18)}...</Text><Text style={styles.meta}>Phòng: {ROOM_LABEL}</Text>
    </View>
    <View style={styles.card}><Text style={styles.permission}>Quyền: {status}</Text>
      {distance !== null && <Text style={styles.distance}>≈ {distance.toFixed(1)} km tới cổng KTX</Text>}
      <Text style={styles.feeLabel}>Phí ship ước tính</Text>
      {fee !== null && <Text style={styles.fee}>{fee.toLocaleString('vi-VN')} đ</Text>}
      {(status === 'denied' || status === 'blocked') && <Text style={styles.message}>{message}</Text>}
      <Pressable style={styles.primary} onPress={requestLocation} disabled={status === 'loading'}><Text style={styles.primaryText}>{status === 'loading' ? 'Đang lấy vị trí...' : 'Lấy vị trí ước tính ship'}</Text></Pressable>
      {status === 'blocked' && <Pressable style={styles.settings} onPress={openSettings}><Text style={styles.settingsText}>Mở Cài đặt</Text></Pressable>}
    </View>
    <Pressable style={styles.logout} onPress={logout}><Text style={styles.logoutText}>Đăng xuất</Text></Pressable>
  </View></ScreenFrame>;
}
const styles = StyleSheet.create({
  page: {flex: 1, padding: SPACING.md}, heading: {fontSize: 18, color: COLORS.surface, fontWeight: '900', textAlign: 'center', backgroundColor: COLORS.primary, marginHorizontal: -SPACING.md, marginTop: -SPACING.md, marginBottom: SPACING.md, paddingVertical: 14},
  card: {backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.md}, name: {fontSize: 22, fontWeight: '900', color: COLORS.text}, meta: {color: COLORS.textLight, marginTop: 6}, permission: {color: COLORS.success, fontWeight: '800'}, distance: {color: COLORS.text, fontWeight: '700', marginTop: 6}, feeLabel: {color: COLORS.textLight, marginTop: SPACING.md}, message: {marginVertical: SPACING.sm, color: COLORS.textLight, lineHeight: 21}, fee: {color: COLORS.secondary, fontSize: 18, fontWeight: '900', marginTop: 2, marginBottom: SPACING.md},
  primary: {height: 50, borderRadius: 12, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center'}, primaryText: {color: COLORS.surface, fontWeight: '800'}, settings: {height: 46, borderRadius: 12, borderWidth: 1, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginTop: SPACING.sm}, settingsText: {color: COLORS.primary, fontWeight: '800'},
  logout: {height: 50, borderRadius: 12, borderWidth: 1, borderColor: COLORS.error, alignItems: 'center', justifyContent: 'center'}, logoutText: {color: COLORS.error, fontWeight: '800'},
});
