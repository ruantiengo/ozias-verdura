/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { DataTable } from "@/components/data-table";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { AddProductDialog } from "../_components/create-product";
import { columns } from "./components/table/columns";
import { useSellOrderStore } from "@/store/sell-order-store";
import { DatePicker } from "../_components/sellOrder/date-picker";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ProductsPage() {

  const {sellOrders, setSellOrders} = useSellOrderStore()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const { data, isLoading } = api.sellOrder.getAll.useQuery({startDate: startDate?.toISOString(), endDate: endDate?.toISOString()}, {
    enabled: startDate !== undefined && endDate !== undefined && startDate <= endDate,
    initialData: []
  });
  const { toast } = useToast()
  useEffect(() => {
    if(isLoading){
      toast({
        description: <div className="flex gap-2"><span className="w-[300px]">Carregando...</span></div>
      })
    }
  }, [isLoading, toast])
  useEffect(() => {
    setSellOrders(
      data
    );
 
  }, [data, setSellOrders]);

  

    return (
      <main>
        <DataTable
          columns={columns}
          data={sellOrders  ?? []}
          dataSellOrder={[<Button variant={"outline"} key={"oi"}>Exportar Pedidos</Button>,
         <Button variant={"outline"} key={"copy"}>Copiar pedidos</Button>]}
          tableProperties={[<AddProductDialog key={"addProduct"}/>,
           <DatePicker key={"startDate"} description="Inicio do periodo" date={startDate} setDate={setStartDate}/>,
           <DatePicker key={"endDate"} description="Fim do periodo" date={endDate} setDate={setEndDate}/>,
           ]}

        />
      
      </main>
    );
}
