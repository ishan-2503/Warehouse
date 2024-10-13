import React, {  useEffect, useState } from "react";
// import SubLocation from "./SubLocation";
import axios from "axios";
import { useItems } from "./context/Itemprovider";

interface GodownData {
    id: string,
    name: string,
    parent_godown: string
}


export default function Location({id, name }: {id: string, name: String }) {
    const [godowns, setGodowns] = useState<GodownData[]>([]);
    const { setProducts} = useItems();
    useEffect(()=>{
        const fetchSubLocation = async (): Promise<void> => {
            try {
                const res = await axios.get("http://localhost:5000/location/godown/" + id);
                console.log(res.data.Sublocations);
                setGodowns(res.data.Sublocations);   
            } catch (err) {
                console.log("Error in fetching sublocation: " + err);
            }
        }

        fetchSubLocation();
    }, [id]);
  return (
    <ul className="mt-6 space-y-1">
      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <span className="text-lg font-medium"> {name} </span>
            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>
          <ul className="mt-2 space-y-1 px-4">
            <li>
                {godowns.map((godown)=>{
                    // return <SubLocation key={godown.id} id={godown.id} name={godown.name} location_id={id} />
                    return (
                      <button onClick={()=>{
                        const fetchItems = async () => {
                          const res = await axios.get("http://localhost:5000/location/godown/" + id + "/items/" + godown.id);
                          console.log(res.data.Items);
                          setProducts(res.data.Items);
                        }
                        fetchItems();
                      }} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        {godown.name}
                      </button>
                    )
                })}
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
}
