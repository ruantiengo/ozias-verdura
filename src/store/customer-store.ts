/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type CustomerWithAddress } from '@/types/customer'

import { create } from 'zustand'

interface CustomerState {
  customers: CustomerWithAddress[]
  setCustomers: (customers: CustomerWithAddress[]) => void
  addCustomer: (customer: CustomerWithAddress) => void
  removeCustomer: (customerId: number) => void

  findCustomer: (customerId: number) => CustomerWithAddress | undefined

  updateCustomer: (customer: CustomerWithAddress) => void
}

export const useCustomerStore = create<CustomerState>((set, _state) => ({
  customers: [] as CustomerWithAddress[],
  setCustomers: (customers) => set((_state) => ({ customers })),
  addCustomer: (customer) => set(state => ({customers: [...state.customers, customer]})),
  removeCustomer: (customerId) => set(state => ({customers: state.customers.filter(c => c.id != customerId)})),
  findCustomer: (customerId) => {
    return _state().customers.find(c => c.id == customerId)
  },
  updateCustomer: (customer) => set(state => {
    return ({customers: [...state.customers.filter(c => c.id != customer.id), customer]})
  }),
}));