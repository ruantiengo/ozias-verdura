/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Customer } from '@prisma/client'
import { create } from 'zustand'

interface CustomerState {
  customers: Customer[]
  setCustomers: (customers: Customer[]) => void
  addCustomer: (customer: Customer) => void
  removeCustomer: (customerId: number) => void
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [] as Customer[],
  setCustomers: (customers) => set((_state) => ({ customers })),
  addCustomer: (customer) => set(state => ({customers: [...state.customers, customer]})),
  removeCustomer: (customerId) => set(state => ({customers: state.customers.filter(c => c.id != customerId)})),
}));