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
import { userCustomerStore } from "@/store/customer-store";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export const columns: ColumnDef<Customer>[] = [
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
    header: "Nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-right">Telefone</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("phone")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
   
      const { toast } = useToast();
      const [isLoading, setIsLoading] = useState(false)
      const {removeCustomer} = userCustomerStore()
     
      const deleteCustomer = api.customer.delete.useMutation({
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
          setIsLoading(true);
        },
        onError: (e) => {
          
          setIsLoading(false);
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
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              console.log(row.id);
              
              deleteCustomer.mutate({
                id: Number(row.original.id)
              })
            }}>Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

