/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Product } from '@prisma/client'
import { type Table } from '@tanstack/react-table'
import { create } from 'zustand'

interface ProductState {
    products: Product[]
    setProducts: (products: Product[]) => void
    addProduct: (product: Product) => void
    removeProduct: (productId: number) => void
    table: Table<any>
    setTable: (table: Table<any>) => void
}

export const useProductStore = create<ProductState>((set) => ({
    products: [] as Product[],
    setProducts: (products) => set((_state) => ({ products })),
    addProduct: (product) => set(state => ({ products: [...state.products, product] })),
    removeProduct: (productId) => set(state => ({ products: state.products.filter(c => c.id != productId) })),
    table: {} as Table<any>,
    setTable: (table) => set((_state)=> ({table: table}))
}));