import React from "react";
import { useItems } from "./context/Itemprovider";

export default function ItemRow({ product }: { product: any }) {
  const { products } = useItems();
  if (products.length === 0) {
    return <h1>No Items Available</h1>;
  }
  return (
    <tr
      key={product.id}
      className="border-b transition-colors hover:bg-muted/50"
    >
      <td className="p-4 align-middle hidden sm:table-cell">
        <img
          alt="Product"
          loading="lazy"
          width="64"
          height="64"
          decoding="async"
          className="aspect-square rounded-md object-cover"
          src={product.image_url}
        />
      </td>
      <td className="p-4 align-middle font-medium">{product.name}</td>
      <td className="p-4 align-middle">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors">
          {product.status}
        </div>
      </td>
      <td className="p-4 align-middle hidden md:table-cell">{product.price}</td>
      <td className="p-4 align-middle hidden md:table-cell">{product.brand}</td>
      <td className="p-4 align-middle hidden md:table-cell">
        {product.category}
      </td>
      <td className="p-4 align-middle">
        <button className="inline-flex items-center justify-center h-10 w-10 rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-ellipsis h-4 w-4"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
          <span className="sr-only">Toggle menu</span>
        </button>
      </td>
    </tr>
  );
}
