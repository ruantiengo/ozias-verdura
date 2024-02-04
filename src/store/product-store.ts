/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Product } from '@prisma/client'
import { create } from 'zustand'

interface ProductState {
    products: Product[]
    setProducts: (products: Product[]) => void
    addProduct: (product: Product) => void
    removeProduct: (productId: number) => void
    findProduct: (productId: number) => Product | undefined
    updateProduct: (product: Product) => void
}

export const useProductStore = create<ProductState>((set,_state) => ({
    products: [] as Product[],
    setProducts: (products) => set((_state) => ({ products })),
    addProduct: (product) => set(state => ({ products: [...state.products, product] })),
    removeProduct: (productId) => set(state => ({ products: state.products.filter(c => c.id != productId) })),
    findProduct: (productId) => _state().products.find(p => p.id === productId),
    updateProduct: (product) => set(state => {
        return ({products: [...state.products.filter(c => c.id != product.id), product]})
      }),
}));