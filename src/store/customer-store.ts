/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Customer } from '@prisma/client'
import { create } from 'zustand'
import { successSave}  from '@/components/toast'
interface CustomerState {
  customers: Customer[]
  setCustomers: (customers: Customer[]) => void
  addCustomer: (customer: Customer) => void
}

export const userCustomerStore = create<CustomerState>((set) => ({
  cart: 0,
  setCustomers: (customers) => set((state) => ({ customers })),
 addCustomer: (customer) => set(state => ({customers: [...state.customers, customer]}))
}));