import { Button } from "@/components/ui/button";
import {
  Dialog as D,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useProductStore } from "@/store/product-store";
import { api } from "@/trpc/react";
import { type Product } from "@prisma/client";
import { BanIcon, Loader2, VerifiedIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface InfoClientDialogProps {
    product: Product
}
export function EditProductDialog({ product }: InfoClientDialogProps) {
  const { toast } = useToast()
  const [name, setName] = useState(product.name);
  const [sellPrice, setSellPrice] = useState<number>(product.sellPrice);
  const [buyPrice, setBuyPrice] = useState<number>(product.buyPrice);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {updateProduct } = useProductStore();
  const editProduct = api.product.update.useMutation({
    onSuccess: (res) => {
      setIsLoading(false);
      setIsOpen(false);
      updateProduct(res);
      toast({
        description: <div className="flex gap-2"><VerifiedIcon color="green"/> <span>Produto editado com sucesso.</span></div>
      })
      router.refresh();
      setName("")
      setSellPrice(0)
      setBuyPrice(0)
    },
    onMutate: () => {
      setIsLoading(true);
      toast({
        description: <div className="flex gap-2"><span className="w-[300px]">Carregando...</span></div>
      })
    },
    onError: (e) => {
      setIsLoading(false);

      if(e.message.includes('Unique constraint failed on the fields: (`name`)')){
        toast({
          variant: "destructive",
          description: <div className="flex gap-2"><BanIcon color="red"/> <span className="w-[300px]">Erro. Um produto que pode ou não estar desabilitado com esse nome já existe, por favor tente usar outro nome.</span></div>
        })
      } else if(e.message.includes('"code": "too_small"')) {
        toast({
          variant: "destructive",
          description: <div className="flex gap-2"><BanIcon color="red"/> <span className="w-[300px]">Erro. O Campo nome não pode ser vazio.</span></div>
        })
      } else{
        toast({
          variant: "destructive",
          description: <div className="flex gap-2"><BanIcon color="red"/> <span className="w-[300px]">Erro Inesperado, por favor tente mais tarde.</span></div>
        })
      }
    },
  });

  return (
    <D open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <span className=" hover:bg-accent w-full h-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground">
          Editar
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo cliente</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo cliente adequadamente.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            editProduct.mutate({
                buyPrice: buyPrice,
                id: product.id,
                sellPrice: sellPrice,
                name: name
            });
          }}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome*
            </Label>
            <Input
              id="name"
              placeholder="Uberaba"
              className="col-span-3"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="buyPrice" className="text-right">
              Preço de Compra
            </Label>
            <Input
              value={buyPrice}
              id="buyPrice"
              placeholder="R$ 1,50"
              className="col-span-3"
              onChange={(e) => setBuyPrice(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sellPrice" className="text-right">
              Preço de Venda
            </Label>
            <Input
              value={sellPrice}
              id="username"
              placeholder="R$ 1,50"
              className="col-span-3"
              onChange={(e) => setSellPrice(Number(e.target.value))}
            />
          </div>
        
          <DialogFooter>
            <Button type="submit" className="w-32" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save changes"
              )}{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </D>
  );
}
