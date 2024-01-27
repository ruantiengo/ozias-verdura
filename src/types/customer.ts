import { type Customer, type Address } from "@prisma/client";

export type CustomerWithAddress = Partial<Customer>
   & { address: Address }