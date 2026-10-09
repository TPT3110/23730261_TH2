import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import ScreenFrame from '@components/ScreenFrame';
import {STUDENT, VARIANT} from '@constants/student';
import {COLORS, SPACING} from '@constants/theme';
import {useAuthStore} from '@stores/authStore';

export default function LoginScreen(): React.JSX.Element {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.login);
  const isPhone = VARIANT.authField === 'phone';
  const submit = () => {
    if (!value.trim()) return setError(`Vui lòng nhập ${isPhone ? 'số điện thoại' : 'email'}.`);
    setError(''); login();
  };
  return <ScreenFrame><KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <View style={styles.logo}><Text style={styles.logoText}>KTXGO</Text></View>
    <Text style={styles.heading}>Giao tận phòng ký túc xá</Text>
    <TextInput style={styles.input} value={value} onChangeText={setValue}
      placeholder={isPhone ? `SĐT - ${STUDENT.mssv}` : `Email - ${STUDENT.mssv}`}
      keyboardType={isPhone ? 'phone-pad' : 'email-address'} autoCapitalize="none" placeholderTextColor={COLORS.textLight} />
    {!!error && <Text style={styles.error}>{error}</Text>}
    <Pressable style={styles.button} onPress={submit}><Text style={styles.buttonText}>Vào cửa hàng</Text></Pressable>
  </KeyboardAvoidingView></ScreenFrame>;
}
const styles = StyleSheet.create({
  page: {flex: 1, justifyContent: 'center', padding: SPACING.lg},
  logo: {width: 100, height: 100, borderRadius: 28, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'},
  logoText: {color: COLORS.surface, fontSize: 23, fontWeight: '900'},
  heading: {fontSize: 24, color: COLORS.text, textAlign: 'center', fontWeight: '800', marginVertical: SPACING.xl},
  input: {height: 52, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: SPACING.md, backgroundColor: COLORS.surface, color: COLORS.text},
  error: {color: COLORS.error, marginTop: SPACING.sm},
  button: {marginTop: SPACING.md, height: 52, borderRadius: 12, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center'},
  buttonText: {color: COLORS.surface, fontSize: 16, fontWeight: '800'},
});
