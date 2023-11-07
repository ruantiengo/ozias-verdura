/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { DataTable } from "@/components/data-table";

import { api } from "@/trpc/react";
import PageLoading from "./loading";
import { useEffect } from "react";
import { AddClientDialog } from "../_components/create-client";
import { useProductStore } from "@/store/product-store";
import { columns } from "./components/table/columns";
import { AddProductDialog } from "../_components/create-product";
import { PdfProducts } from "./components/pdf";
import dynamic from "next/dynamic";

export default function ProductsPage() {
  const { data, isLoading, error } = api.product.getAll.useQuery();
  const { products, setProducts } = useProductStore();

  useEffect(() => {
    setProducts(
      data as {
        id: number;
        name: string;
        sellPrice: number;
        buyPrice: number;
        createdAt: Date;
        enabled: boolean;
      }[],
    );
  }, [data, setProducts]);

  if (isLoading) {
    return <PageLoading />;
  } else if (error) {
    return <></>;
  } else {  

    const DynamicPdf = dynamic(() =>
  import('./components/pdf').then((mod) => mod.PdfProducts)
)
    return (
      <main>
        <DynamicPdf/>
        <DataTable
          columns={columns}
          data={products ?? []}
          addElement={<AddProductDialog />}
          identifier="products"
        />
      </main>
    );
  }
}
