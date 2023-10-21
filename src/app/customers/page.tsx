"use client"

import { DataTable } from "@/components/data-table";
import { ModeToggle } from "@/components/toogle-mode";
import { columns, data } from "./components/table/columns";

export default function CustomerPage() {

  return (
    <main>
      <DataTable columns={columns} data={data}/>
    </main>
  );
}

