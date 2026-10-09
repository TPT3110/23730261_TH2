import {useState} from 'react';
import {Linking, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {BASE_SHIP_FEE, VARIANT} from '@constants/student';
import {useCartStore} from '@stores/cartStore';

const CAMPUS = {latitude: 10.822, longitude: 106.687};
export type LocationStatus = 'idle' | 'loading' | 'granted' | 'denied' | 'blocked';

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (degree: number) => degree * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const value = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function calculateFee(km: number): number {
  return VARIANT.shipFormula === 'A'
    ? BASE_SHIP_FEE + Math.round(km * 2000)
    : BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
}

export function useCampusLocation() {
  const [status, setStatus] = useState<LocationStatus>('idle');
  const [message, setMessage] = useState('Chưa xin quyền vị trí.');
  const setShipping = useCartStore(state => state.setShipping);
  const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const getCurrentPosition = () => new Promise<void>((resolve) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const km = haversineKm(latitude, longitude, CAMPUS.latitude, CAMPUS.longitude);
        setShipping(calculateFee(km), km);
        setStatus('granted');
        setMessage(`Đã lấy vị trí. Khoảng cách ước tính ${km.toFixed(2)} km.`);
        resolve();
      },
      () => {
        const mock = {latitude: 10.85, longitude: 106.65};
        const km = haversineKm(mock.latitude, mock.longitude, CAMPUS.latitude, CAMPUS.longitude);
        setShipping(calculateFee(km), km);
        setStatus('granted');
        setMessage(`Máy ảo dùng tọa độ giả. Khoảng cách ${km.toFixed(2)} km.`);
        resolve();
      },
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000},
    );
  });

  const requestLocation = async () => {
    setStatus('loading');
    setMessage('Đang kiểm tra quyền vị trí...');
    let result = await check(permission);
    if (result === RESULTS.DENIED) result = await request(permission);
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) return getCurrentPosition();
    if (result === RESULTS.BLOCKED || result === RESULTS.UNAVAILABLE) {
      setStatus('blocked');
      setMessage('Quyền vị trí đã bị chặn. Hãy mở Cài đặt để cấp quyền.');
      return;
    }
    setStatus('denied');
    setMessage('Bạn đã từ chối vị trí. Có thể nhấn lại để xin quyền.');
  };

  return {status, message, requestLocation, openSettings: () => Linking.openSettings()};
}
