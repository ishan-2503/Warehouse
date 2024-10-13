import React, { createContext, useContext, useState } from "react";

interface ItemProp {
  item_id: string;
  name: string;
  quantity: number;
  categroy: string;
  price: number;
  status: string;
  godown_id: string;
  brand: string;
  attributes: object;
  image_url: string;
}

interface ItemContextType {
  products: ItemProp[];
  setProducts: React.Dispatch<React.SetStateAction<ItemProp[]>>;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export default function Itemprovider({ children }: { children: any }) {
  const [products, setProducts] = useState<ItemProp[]>([]);
  return (
    <ItemContext.Provider value={{ products, setProducts }}>
      {children}
    </ItemContext.Provider>
  );
}

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemProvider");
  }
  return context;
};
