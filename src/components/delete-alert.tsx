/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {
    AlertDialog as Dialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { api } from "@/trpc/react"
import { type Table } from "@tanstack/react-table"
import { BanIcon, VerifiedIcon } from "lucide-react"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import { useCustomerStore } from "@/store/customer-store"
  
  type AlertDialogProps = {
    table: Table<any>
  }
  export function AlertDialog({table}: AlertDialogProps) {
    const {toast} = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const {removeCustomer } = useCustomerStore()
    const deleteCustomer = api.customer.deleteMany.useMutation({
      onSuccess: (res, ids) => {
        toast({
          description: <div className="flex gap-2"><VerifiedIcon color="green"/> <span>Cliente deletado com sucesso.</span></div>,
        })
        ids.ids.map(id => {
          removeCustomer(id)
        })
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
      <Dialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={table.getFilteredSelectedRowModel().rows.length == 0}>Deletar selecionado(s)</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita, se você clicar em excluir os clientes serão desabilitados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              const originalIds = table.getFilteredSelectedRowModel().rows.map(r => r.original.id as number)
              console.log(originalIds);
              deleteCustomer.mutate({
                ids: originalIds
              })
              
            }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Dialog>
    )
  }
  