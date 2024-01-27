import { Button } from "@/components/ui/button";
import {
  Dialog as D,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type CustomerWithAddress } from "@/types/customer";
import { useState } from "react";

interface InfoClientDialogProps {
    customer: CustomerWithAddress | undefined
}
export function InfoClientDialog({customer}: InfoClientDialogProps) {

  const [isOpen, setIsOpen] = useState(false)

  if(customer === undefined){
    return <Button variant="outline" disabled>Ver</Button>
  }
 
  return (
    <D open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <span className=" hover:bg-accent w-full h-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground">
          Ver
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informações do Cliente</DialogTitle>
          <DialogDescription>
            Veja todos os dados do cliente
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"

        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome*
            </Label>
            <Input
              id="name"
              placeholder="ABC - Venda Nova"
              className="col-span-3"
              value={customer.name}
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              value={customer.email}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Telefone
            </Label>
            <Input
              value={customer.phone}
              className="col-span-3"
              disabled
            />
          </div>
     
 
        
        </form>
      </DialogContent>
    </D>
  );
}
