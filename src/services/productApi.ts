import {useQuery} from '@tanstack/react-query';
import {PRICE_MULTIPLIER, STALE_TIME_MS} from '@constants/student';
import {apiClient} from './apiClient';

type ApiProduct = {id: number; title: string; price: number; description: string; image: string};
export type Product = {id: string; title: string; price: number; description: string; image: string};

async function getProducts(): Promise<Product[]> {
  const [response] = await Promise.all([
    apiClient.get<ApiProduct[]>('/products?limit=12'),
    new Promise<void>(resolve => setTimeout(resolve, 900)),
  ]);
  return response.data.map(item => ({
    id: String(item.id),
    title: item.title,
    description: item.description,
    image: item.image,
    price: Math.round(item.price * PRICE_MULTIPLIER),
  }));
}

export function useProductsQuery() {
  return useQuery({queryKey: ['products'], queryFn: getProducts, staleTime: STALE_TIME_MS});
}
