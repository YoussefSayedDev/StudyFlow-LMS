// import { studentsData } from "@/lib/data";
// import { Student } from "@/types/interfaces";
// import Image from "next/image";
// import { BsSortDown } from "react-icons/bs";
// import { FaPlus } from "react-icons/fa";
// import { IoMdOptions } from "react-icons/io";
// import Pagination from "../../(main)/_components/Pagination";
// import Table from "../../(main)/_components/Table";
// import TableSearch from "../../(main)/_components/TableSearch";
const page = () => {
  return <div>page</div>;
};

export default page;

// const columns = [
//   {
//     header: "Info",
//     accessor: "info",
//   },
//   {
//     header: "Student ID",
//     accessor: "student_id",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Grade",
//     accessor: "grade",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Class",
//     accessor: "class",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Phone",
//     accessor: "phone",
//     className: "hidden lg:table-cell",
//   },
//   {
//     header: "Address",
//     accessor: "address",
//     className: "hidden lg:table-cell",
//   },
//   {
//     header: "Actions",
//     accessor: "actions",
//     className: "flex items-center justify-end gap-2 mr-4",
//   },
// ];

// const StudentListPage = () => {
//   return (
//     <div className="m-4 mt-0 flex-1 rounded-md bg-accent p-4">
//       {/* Top */}
//       <div className="flex items-center justify-between">
//         <h1 className="hidden text-lg font-semibold md:block">All Students</h1>
//         <div className="flex w-full flex-col items-center gap-2 md:w-auto md:flex-row">
//           <TableSearch />
//           <div className="flex items-center gap-2 self-end">
//             <button
//               title="filter"
//               className="flex size-[35px] items-center justify-center gap-2 rounded-md bg-sidebar-background transition-colors duration-300 hover:text-primary"
//             >
//               <IoMdOptions className="size-5" />
//             </button>
//             <button
//               title="sort"
//               className="flex size-[35px] items-center justify-center gap-2 rounded-md bg-sidebar-background transition-colors duration-300 hover:text-primary"
//             >
//               <BsSortDown className="size-5" />
//             </button>
//             <button
//               title="plus"
//               className="flex size-[35px] items-center justify-center gap-2 rounded-md bg-sidebar-background transition-colors duration-300 hover:text-primary"
//             >
//               <FaPlus className="size-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* List */}
//       <Table columns={columns}>
//         {studentsData.map(
//           (
//             item, // Change this line to use the data from the database
//           ) => (
//             <StudentRow key={item.id} item={item} />
//           ),
//         )}
//       </Table>
//       {/* Pagination */}
//       <Pagination />
//     </div>
//   );
// };

// // Teacher Row
// const StudentRow = ({ item }: { item: Student }) => {
//   return (
//     <tr className="flex items-center justify-between border-b border-card px-1 py-2 transition-colors duration-300 hover:bg-sidebar-background">
//       <td className="flex flex-1 items-center gap-4">
//         <Image
//           alt="teacher"
//           src={item.img}
//           width={50}
//           height={50}
//           className="size-10 rounded-full object-cover md:hidden xl:block"
//         />
//         <div className="">
//           <h3 className="text-md w-24 overflow-hidden text-ellipsis text-nowrap font-semibold xl:w-32">
//             {item.name}
//           </h3>
//           <p className="text-xs text-muted-foreground">
//             {item.email && (
//               <span className="text-[10px] text-muted-foreground">
//                 {item.email}
//               </span>
//             )}
//           </p>
//         </div>
//       </td>
//       <td className="hidden flex-1 md:table-cell">
//         <p className="text-sm text-muted-foreground">{item.student_id}</p>
//       </td>
//       <td className="hidden flex-1 md:table-cell">
//         <p className="text-sm text-muted-foreground">{item.grade}</p>
//       </td>
//       <td className="hidden flex-1 md:table-cell">
//         <p className="text-sm text-muted-foreground">{item.class}</p>
//       </td>
//       <td className="hidden flex-1 lg:table-cell">
//         <p className="text-sm text-muted-foreground">{item.phone}</p>
//       </td>
//       <td className="hidden flex-1 lg:table-cell">
//         <p className="text-sm text-muted-foreground">{item.address}</p>
//       </td>
//       <td className="flex flex-1 items-center justify-end gap-2">
//         <div className="flex items-center gap-2">
//           <button
//             title="edit"
//             className="flex size-[35px] items-center justify-center gap-2 rounded-md bg-sidebar-background transition-colors duration-300 hover:text-primary"
//           >
//             <IoMdOptions className="size-5" />
//           </button>
//           <button
//             title="delete"
//             className="flex size-[35px] items-center justify-center gap-2 rounded-md bg-sidebar-background transition-colors duration-300 hover:text-primary"
//           >
//             <FaPlus className="size-5" />
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default StudentListPage;
