/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import { DataTable } from "@/components/data-table";

import { columns } from "./components/table/columns";
import { api } from "@/trpc/react";
import PageLoading from "./loading";
import { useCustomerStore } from "@/store/customer-store";
import { useEffect } from "react";
import { AddClientDialog } from "../_components/client/create-client";
import { type CustomerWithAddress } from "@/types/customer";

export default function CustomerPage() {

    const {data, isLoading, error} = api.customer.getAll.useQuery();
    const { customers, setCustomers } = useCustomerStore()
  
    useEffect(() => {
      return setCustomers(data as CustomerWithAddress[]);
    }, [data, setCustomers])

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
          <DataTable columns={columns} data={customers ?? []} addElement={<AddClientDialog/>}/>
        </main>
      );
    }
  

}
