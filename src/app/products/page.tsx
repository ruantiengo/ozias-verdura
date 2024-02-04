/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { DataTable } from "@/components/data-table";

import { api } from "@/trpc/react";
import PageLoading from "./loading";
import { useEffect } from "react";

import { useProductStore } from "@/store/product-store";
import { columns } from "./components/table/columns";
import { AddProductDialog } from "../_components/create-product";


export default function ProductsPage() {
  const { data, isLoading } = api.product.getAll.useQuery();
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
  }

    return (
      <main>
        <DataTable
          columns={columns}
          data={products ?? []}
          tableProperties={[
          <AddProductDialog key={"addproduct"}/>]}
        />
      </main>
    );
}
