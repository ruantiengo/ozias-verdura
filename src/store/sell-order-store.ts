/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type SellOrder } from '@prisma/client'

import { create } from 'zustand'

interface SellOrderState {
    sellOrders: SellOrder[]
    setSellOrders: (sellOrders: SellOrder[]) => void
    addSellOrder: (sellOrder: SellOrder) => void
    removeSellOrder: (sellOrder: number) => void


    findSellOrder: (sellOrderId: number) => SellOrder | undefined

    updateSellOrder: (sellOrder: SellOrder) => void
}

export const useSellOrderStore = create<SellOrderState>((set,_state) => ({
    sellOrders: [] as SellOrder[],
    setSellOrders: (sellOrders) => set((_state) => ({ sellOrders })),
    addSellOrder: (product) => set(state => ({ sellOrders: [...state.sellOrders, product] })),
    removeSellOrder: (productId) => set(state => ({ sellOrders: state.sellOrders.filter(c => c.id != productId) })),
    findSellOrder: (sellOrder) => _state().sellOrders.find(p => p.id === sellOrder),
    updateSellOrder: (product) => set(state => {
        return ({sellOrders: [...state.sellOrders.filter(c => c.id != product.id), product]})
      }),
}));