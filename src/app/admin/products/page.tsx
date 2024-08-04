"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/http/api";
import { Product } from "@/types";
import ProductSheet from "./product-sheet";
import { useNewProduct } from "@/store/product/product-store";
import { Loader } from "lucide-react";

const ProductsPage = () => {
  const { onOpen } = useNewProduct();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Products</h3>
        <Button size={"sm"} onClick={onOpen}>
          Add Product
        </Button>
        <ProductSheet />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader className="size-8 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={products || []} />
      )}
    </>
  );
};

export default ProductsPage;
