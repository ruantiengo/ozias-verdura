/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";
import {
  ArrowUpDown,
  BanIcon,
  MoreHorizontal,
  VerifiedIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

import { useProductStore } from "@/store/product-store";
import DeleteDialog from "@/app/_components/client/delete-dialog";
import { EditProductDialog } from "@/app/_components/product/edit-product";
import { useSellOrderStore } from "@/store/sell-order-store";
import { Customer } from "@prisma/client";

export type SellOrder = {
  id: string;
  customerId: string;
  customerName: string;
  totalPrice: string;
  date: Date;

};

export const columns: ColumnDef<SellOrder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => {

      return (
        <div
          className="flex cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
  
      const  customer = row.getValue("customer") as { name: string};

      return <div className="capitalize">{customer.name}</div>
      
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="cursor-pointer">Data</div>,
    cell: ({ row }) => {
      const formatted = new Intl.DateTimeFormat("pt-BR",{
      }).format()
      return (
        <div className="font-medium">{formatted}</div>
      )
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <div
          className="flex  cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("pt-BR",{
        style: "currency",
        currency: "BRL"
      }).format(row.getValue("totalPrice"))
      return (<div className="uppercase">{formatted}</div>)
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
   
      const { toast } = useToast();
 
      const {removeSellOrder, findSellOrder} = useSellOrderStore()
      const sellOrder = findSellOrder(Number(row.original.id))

      const deleteProductFromApi = api.sellOrder.delete.useMutation({
        onSuccess: (res) => {
          toast({
            description: <div className="flex gap-2"><VerifiedIcon color="green"/> <span>Pedido de venda deletado com sucesso.</span></div>,
          })
          removeSellOrder(res.id)
        },
        onMutate: () => {
          toast({
            description: <div className="flex gap-2"> <span>Carregando...</span></div>,
          })

        },
        onError: (e) => {
          toast({
            variant: "destructive",
            description: <div className="flex gap-2"><BanIcon color="red"/> <span className="w-[300px]">{e.message}</span></div>
          })
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem asChild></DropdownMenuItem>
            <DropdownMenuItem asChild><DeleteDialog idToBeDeleted={sellOrder!.id} removeElementFromApi={deleteProductFromApi} description="Essa ação excluira esse pedido."/></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

