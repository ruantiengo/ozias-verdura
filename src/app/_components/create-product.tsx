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
import { useCustomerStore } from "@/store/customer-store";
import { useProductStore } from "@/store/product-store";
import { api } from "@/trpc/react";
import { BanIcon, Loader2, VerifiedIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddProductDialog() {
  const { toast } = useToast()
  const [name, setName] = useState("");
  const [sellPrice, setSellPrice] = useState<number>();
  const [buyPrice, setBuyPrice] = useState<number>();


  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { addProduct } = useProductStore();
  const createProduct = api.product.create.useMutation({
    onSuccess: (res) => {
      setIsLoading(false);
      setIsOpen(false);
      addProduct(res);
      toast({
        description: <div className="flex gap-2"><VerifiedIcon color="green"/> <span>Produto criado com sucesso</span></div>
      })
      router.refresh();
      setName("")
      setBuyPrice(0)
      setSellPrice(0)
    },
    onMutate: () => {
      setIsLoading(true);
      toast({
        description: <div className="flex gap-2"><span className="w-[300px]">Carregando...</span></div>
      })
    },
    onError: (e) => {
      setIsLoading(false);
      console.log();
      if(e.message.includes('Unique constraint failed on the fields: (`name`)')){
        toast({
          variant: "destructive",
          description: <div className="flex gap-2"><BanIcon color="red"/> <span className="w-[300px]">Erro. Um Produto que pode ou não estar desabilitado com esse nome já existe, por favor tente usar outro nome.</span></div>
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
        <Button variant="outline">Adicionar Produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo Produto adequadamente.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            createProduct.mutate({
                name,
                sellPrice: sellPrice!,
                buyPrice: buyPrice!
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
            <Label htmlFor="username" className="text-right">
              Preço de venda
            </Label>
            <Input
              value={sellPrice}
              id="username"
              placeholder="R$ 5,50"
              className="col-span-3"
              type="number"
              onChange={(e) => setSellPrice(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Preço de compra
            </Label>
            <Input
              value={buyPrice}
              id="username"
              placeholder="R$ 12,50"
              className="col-span-3"
              type="number"
              onChange={(e) => setBuyPrice(Number(e.target.value))}
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
