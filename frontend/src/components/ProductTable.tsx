// import React, { useState } from "react";

import { useItems } from "./context/Itemprovider";
import ItemRow from "./ItemRow";


const ProductTable = () => {
  const { products } = useItems();

  if (products.length===0) {
    return(
      <h1>No items</h1>
    )
  }

  return (
    <div className="p-6 pt-0 w-full">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Name
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Status
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">
                Price
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">
                Brand
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">
                Category
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0">
            {products.map((item)=>{
              return <ItemRow key={item.item_id} product={item} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
