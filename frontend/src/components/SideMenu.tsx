import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import Location from "./Location";
import { useNavigate } from "react-router-dom";

interface LocationData {
  id: string;
  name: string;
  parent_godown: string;
}

export default function SideMenu() {
  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLocations = async (): Promise<void> => {
      try {
        const res = await axios.get("http://localhost:5000/location/");
        console.log(res.data);
        setLocationData(res.data.locations);
      } catch (err) {
        console.log("Error in fetching location data: " + err);
      }
    };

    fetchLocations();
  }, []);
  return (
    <div className="flex h-screen">
      <div className="flex h-screen flex-col justify-between w-80 border-e bg-white">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-40 place-content-center rounded-lg bg-gray-100 text-sm text-gray-600">
              Locations
            </span>
            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
              <form action="#">
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>

                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    Logout
                  </span>
                </button>
              </form>
            </div>
          </div>
          {locationData.map((entry) => {
            return <Location key={entry.id} id={entry.id} name={entry.name} />;
          })}
        </div>
      </div>
      {/* <div className="flex-1 p-6">{children}</div> */}
    </div>
  );
}
