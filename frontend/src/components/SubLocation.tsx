import axios from "axios";
import React, {useState} from "react";
// import { Link } from "react-router-dom";

interface ProductProp {
  item_id: string,
  name: string,
  quantity: number,
  categroy: string,
  price: number,
  status: string,
  godown_id: string,
  brand: string,
  attributes: object,
  image_url: string
}

export default function SubLocation({key, id, name, location_id}: {key: string, id:string, name: string, location_id: string}) {
  const [products, setProducts] = useState<ProductProp[]>([]);
  return (
    <button
      onClick={()=>{
        const fetchProducts = async () => {
          const res = await axios.get("http://localhost:5000/location/godown/" + location_id + "/items/" + id);
          console.log(res.data.Items)
          setProducts(res.data.Items)
        }
        fetchProducts();
      }}
      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
      {name}
    </button>
  );
}