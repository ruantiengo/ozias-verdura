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
import { userCustomerStore } from "@/store/customer-store";
import { api } from "@/trpc/react";
import { BanIcon, Loader2, VerifiedIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddClientDialog() {
  const { toast } = useToast()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { addCustomer } = userCustomerStore();
  const createCustomer = api.customer.create.useMutation({
    onSuccess: (res) => {
      setIsLoading(false);
      setIsOpen(false);
      addCustomer(res);
      toast({
        description: <div className="flex gap-2"><VerifiedIcon color="green"/> <span>Cliente criado com sucesso</span></div>
      })
      router.refresh();
      setName("")
      setNumber("")
      setStreet("")
      setDistrict("")
      setCity("")
      setCep("")
      setPhone("")
      setEmail("")
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onError: () => {
      setIsLoading(false);
      toast({
        variant: "destructive",
        description: <div className="flex gap-2"><BanIcon color="red"/> <span className="w-[300px]">Erro ao criar o cliente, verifique se as informações estão corretas</span></div>
      })
    },
  });

  return (
    <D open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant="outline">Adicionar Cliente</Button>
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
            createCustomer.mutate({
              cep,
              city,
              district,
              email,
              name,
              number,
              phone,
              street,
            });
          }}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Uberaba"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              value={email}
              id="username"
              placeholder="email@mail.com"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Telefone
            </Label>
            <Input
              value={phone}
              id="username"
              placeholder="(31) 99999-9999"
              className="col-span-3"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              CEP
            </Label>
            <Input
              value={cep}
              id="username"
              placeholder="00000-000"
              className="col-span-3"
              onChange={(e) => setCep(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Cidade
            </Label>
            <Input
              value={city}
              id="cidade"
              placeholder="Belo Horizonte"
              className="col-span-3"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Bairro
            </Label>
            <Input
              value={district}
              id="bairro"
              placeholder="Letícia"
              className="col-span-3"
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Rua
            </Label>
            <Input
              value={street}
              id="cidade"
              placeholder="999"
              className="col-span-3"
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Número
            </Label>
            <Input
              value={number}
              id="cidade"
              placeholder="999"
              className="col-span-3"
              onChange={(e) => setNumber(e.target.value)}
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
