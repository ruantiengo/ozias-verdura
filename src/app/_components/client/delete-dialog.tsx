import React, { Dispatch, useState } from 'react'
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
    customerId: number;
}
const DeleteDialog = ({ customerId}: DeleteDialogProps) => {

    const {removeCustomer} = useCustomerStore()
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
  
        },
        onError: (e) => {
          

          toast({
            variant: "destructive",
            description: <div className="flex gap-2"><BanIcon color="red"/> <span className="w-[300px]">{e.message}</span></div>
          })
        },
      });
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
                Essa ação desabilitará esse cliente. Isso vai deixar esse cliente inoperavel.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
                   deleteCustomer.mutate({
                    id: customerId
                  })
            }}>Sim, excluir</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

  )
}

export default DeleteDialog