import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {VARIANT} from '@constants/student';
import {COLORS} from '@constants/theme';
import CartScreen from '@screens/CartScreen';
import MeScreen from '@screens/MeScreen';
import {totalQuantity, useCartStore} from '@stores/cartStore';
import ShopStack from './ShopStack';
export type MainTabParamList = {Shop: undefined; Cart: undefined; Me: undefined};
const Tab = createBottomTabNavigator<MainTabParamList>();
const icons = {Shop: '⌂', Cart: '🛒', Me: '●'} as const;
export default function MainTabs() {
  const quantity = useCartStore(totalQuantity);
  const screens = [
    <Tab.Screen key="Shop" name="Shop" component={ShopStack} options={{title: 'Cửa hàng'}} />,
    <Tab.Screen key="Cart" name="Cart" component={CartScreen} options={{title: 'Giỏ', tabBarBadge: quantity || undefined}} />,
  ];
  if (VARIANT.tabOrder === 'cartFirst') screens.reverse();
  return <Tab.Navigator screenOptions={({route}) => ({headerShown: false, tabBarActiveTintColor: COLORS.primary, tabBarInactiveTintColor: COLORS.textLight, tabBarIcon: ({color}) => <Text style={{color, fontSize: 19}}>{icons[route.name]}</Text>})}>{screens}<Tab.Screen name="Me" component={MeScreen} options={{title: 'Tôi'}} /></Tab.Navigator>;
}
