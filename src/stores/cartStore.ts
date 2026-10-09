import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {Product} from '@services/productApi';
import {STUDENT} from '@constants/student';

export type CartItem = Product & {quantity: number};
type CartState = {
  items: CartItem[];
  shippingFee: number | null;
  distanceKm: number | null;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  setShipping: (fee: number, distanceKm: number) => void;
};

export const useCartStore = create<CartState>()(persist(
  set => ({
    items: [], shippingFee: null, distanceKm: null,
    addItem: product => set(state => {
      const current = state.items.find(item => item.id === product.id);
      return {items: current
        ? state.items.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
        : [...state.items, {...product, quantity: 1}]};
    }),
    removeItem: id => set(state => ({items: state.items.filter(item => item.id !== id)})),
    changeQty: (id, delta) => set(state => ({
      items: state.items
        .map(item => item.id === id ? {...item, quantity: item.quantity + delta} : item)
        .filter(item => item.quantity > 0),
    })),
    setShipping: (shippingFee, distanceKm) => set({shippingFee, distanceKm}),
  }),
  {name: `ktxgo-cart-${STUDENT.mssv}`, storage: createJSONStorage(() => AsyncStorage)},
));

export const totalQuantity = (state: CartState) => state.items.reduce((sum, item) => sum + item.quantity, 0);
export const totalAmount = (state: CartState) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
