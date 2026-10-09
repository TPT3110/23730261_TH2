import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {VARIANT} from '@constants/student';

export function triggerAddHaptic() {
  const type = VARIANT.hapticOnAdd === 'impact' ? 'impactMedium' : 'selection';
  ReactNativeHapticFeedback.trigger(type, {enableVibrateFallback: true, ignoreAndroidSystemSettings: false});
}
