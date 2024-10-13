import React from "react";
// import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu";
// import TableRow from "../components/TableRow";
import ProductTable from "../components/ProductTable";
// import TableRow from "../components/TableRow";

export default function Home() {

  return (
    <div className="flex h-screen">
      {" "}
      <SideMenu />
      <div className="flex-1 p-10">
        {" "}
        <ProductTable />
      </div>
    </div>
  );
}
