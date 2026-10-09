import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VARIANT} from '@constants/student';
import {COLORS} from '@constants/theme';
import DetailScreen from '@screens/DetailScreen';
import HomeScreen from '@screens/HomeScreen';
export type ShopStackParamList = {Home: undefined; Detail: {id: string}};
const Stack = createNativeStackNavigator<ShopStackParamList>();
export default function ShopStack() {return <Stack.Navigator screenOptions={{headerTintColor: COLORS.primary, contentStyle: {backgroundColor: COLORS.background}}}><Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} /><Stack.Screen name="Detail" component={DetailScreen} options={{title: 'Chi tiết món', presentation: VARIANT.detailPresentation}} /></Stack.Navigator>;}
