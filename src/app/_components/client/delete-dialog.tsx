/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { api } from '@/trpc/react';
import { BanIcon, VerifiedIcon } from 'lucide-react';
import { useCustomerStore } from '@/store/customer-store';
import { toast } from '@/components/ui/use-toast';
  
interface DeleteDialogProps {
    idToBeDeleted: number;
    removeElementFromApi: any;

    description: string
}
const DeleteDialog = ({ idToBeDeleted: customerId, removeElementFromApi, description}: DeleteDialogProps) => {

  return (
        <AlertDialog>
        <AlertDialogTrigger>
        <span className=" hover:bg-accent w-full h-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground">
          Excluir
        </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                {description}
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
                   removeElementFromApi.mutate({
                    id: customerId
                  })
            }}>Sim, excluir</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

  )
}

export default DeleteDialog