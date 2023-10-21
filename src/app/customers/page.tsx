/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import { DataTable } from "@/components/data-table";

import { type Customer, columns } from "./components/table/columns";
import { faker } from "@faker-js/faker";
import { api } from "@/trpc/react";
import PageLoading from "./loading";
import { userCustomerStore } from "@/store/customer-store";
import { useEffect } from "react";

const getCustomers = async () => {
  const data: Customer[] = [
    {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    },
    {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    },
    {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    },
    {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    },
    {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    },
    {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    },
    {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    },
    {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const customerData = data;
      resolve(customerData);
    }, 1000); // Atraso de 1 segundo
  });
};
export default function CustomerPage() {

    const {data, isLoading, error} = api.customer.getAll.useQuery();
    const { customers, setCustomers } = userCustomerStore()
    
    useEffect(() => {
      setCustomers(data)
    }, [data])

    if(isLoading){
      return (
        <PageLoading/>
      )
    }
    else if(error){
      return (
        <></>
      )
    }
    else{
    
      return (
        <main>
          <DataTable columns={columns} data={customers ?? []} />
        </main>
      );
    }
  

}
