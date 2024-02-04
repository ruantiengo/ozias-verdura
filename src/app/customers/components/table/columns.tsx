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
import { useState } from "react";
import { useCustomerStore } from "@/store/customer-store";
import { InfoClientDialog } from "@/app/_components/client/info-client";
import { EditClientDialog } from "@/app/_components/client/edit-client";
import DeleteDialog from "@/app/_components/client/delete-dialog";
import { type CustomerWithAddress } from "@/types/customer";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

function formatPhoneNumber(number: string): string {
  // Check if the number has the correct number of digits
  if (number.length !== 11) {
      return "";
  }

  // Format the number in the desired style
  const formattedNumber = `(${number.slice(0, 2)}) ${number.slice(2, 7)}-${number.slice(7)}`;
  return formattedNumber;
}

export const columns: ColumnDef<CustomerWithAddress>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <span
      
          className="text-left flex hover:opacity-50 cursor-default"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <span
      
          className="text-left flex hover:opacity-50 cursor-default"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "phone",
    header: () => <div  className="text-left flex hover:opacity-50 cursor-default">Telefone</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{formatPhoneNumber(String(row.getValue("phone")))}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
   
      const { toast } = useToast();
  

      const {findCustomer } = useCustomerStore()
 
      const customer = findCustomer(Number(row.original.id))
      const {removeCustomer} = useCustomerStore()
      const deleteCustomerFromApi = api.customer.delete.useMutation({
          onSuccess: (res) => {
            toast({
              description: <div className="flex gap-2"><VerifiedIcon color="green"/> <span>Cliente deletado com sucesso.</span></div>,
            })
            removeCustomer(res.id)
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
            <DropdownMenuItem asChild>
              
              <InfoClientDialog customer={customer}/>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <EditClientDialog customer={customer!}/>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteDialog idToBeDeleted={customer!.id!} removeElementFromApi={deleteCustomerFromApi} description="Essa ação desabilitará esse cliente. Isso vai deixar esse cliente inoperavel."/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

