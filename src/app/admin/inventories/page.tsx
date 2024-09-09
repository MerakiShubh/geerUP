"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { DataTable } from "../_components/data-table";
import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { Inventory } from "@/types";
import InventorySheet from "./_components/inventory-sheet";
import { Loader } from "lucide-react";
import { useNewInventory } from "@/store/inventory/inventory-store";
import { getAllInventories } from "@/http/api";

const InventoriesPage = () => {
  const { onOpen } = useNewInventory();

  const {
    data: inventories,
    isLoading,
    isError,
  } = useQuery<Inventory[]>({
    queryKey: ["inventories"],
    queryFn: getAllInventories,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Inventories</h3>
        <Button size={"sm"} onClick={onOpen}>
          Add Inventory
        </Button>
        <InventorySheet />
      </div>

      {isError && <span className="text-red-500">Something went wrong.</span>}

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader className="size-8 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={inventories || []} />
      )}
    </>
  );
};

export default InventoriesPage;
