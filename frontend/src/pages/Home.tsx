import React from "react";
// import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu";
// import TableRow from "../components/TableRow";
import ProductTable from "../components/ProductTable";
// import TableRow from "../components/TableRow";

// export default function Home() {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//         <thead className="ltr:text-left rtl:text-right">
//           <tr>
//             <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//               Name
//             </th>
//             <th className="px-4 py-2"></th>
//           </tr>
//           <tr>
//             <td className="whitespace-nowrap px-4 py-2">
//               <input
//                 type="text"
//                 placeholder="Enter Name"
//                 className="w-full border rounded px-2 py-1 text-gray-700"
//               />
//             </td>
//             <td className="whitespace-nowrap px-4 py-2">
//               <input
//                 type="text"
//                 placeholder="Enter Date of Birth"
//                 className="w-full border rounded px-2 py-1 text-gray-700"
//               />
//             </td>
//             <td className="whitespace-nowrap px-4 py-2">
//               <input
//                 type="text"
//                 placeholder="Enter Role"
//                 className="w-full border rounded px-2 py-1 text-gray-700"
//               />
//             </td>
//             <td className="whitespace-nowrap px-4 py-2">
//               <input
//                 type="text"
//                 placeholder="Enter Salary"
//                 className="w-full border rounded px-2 py-1 text-gray-700"
//               />
//             </td>
//             <td className="whitespace-nowrap px-4 py-2"></td>
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-gray-200">
//           <TableRow />

//           <tr>
//             <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//               Jane Doe
//             </td>
//             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//               04/11/1980
//             </td>
//             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//               Web Designer
//             </td>
//             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//               $100,000
//             </td>
//             <td className="whitespace-nowrap px-4 py-2">
//               <Link
//                 to={""}
//                 className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
//               >
//                 View
//               </Link>
//             </td>
//           </tr>

//           <tr>
//             <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//               Gary Barlow
//             </td>
//             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//               24/05/1995
//             </td>
//             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//               Singer
//             </td>
//             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//               $20,000
//             </td>
//             <td className="whitespace-nowrap px-4 py-2">
//               <Link
//                 to={""}
//                 className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
//               >
//                 View
//               </Link>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

export default function Home() {
  // const products = [
  //   {
  //     id: "1",
  //     image: "https://example.com/image1.jpg",
  //     name: "Smartphone X Pro",
  //     status: "active",
  //     price: "$999.00",
  //     totalSales: 150,
  //     createdAt: "6/23/2024",
  //   },
  //   {
  //     id: "2",
  //     image: "https://example.com/image2.jpg",
  //     name: "Wireless Earbuds Ultra",
  //     status: "active",
  //     price: "$199.00",
  //     totalSales: 300,
  //     createdAt: "6/23/2024",
  //   },
  //   // Add more product objects as needed
  // ];
  return (
    <div className="flex h-screen">
      {" "}
      {/* Use flex to make full use of height */}
      <SideMenu />
      <div className="flex-1 p-10">
        {" "}
        {/* Make this area flexible */}
        <ProductTable />
      </div>
    </div>
  );
}
