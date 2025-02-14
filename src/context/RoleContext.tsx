// "use client";
// import { FormData } from "@/types";
// import React, { createContext, useContext, useState } from "react";

// type Role = "teacher" | "student" | "parent" | "admin";

// type RoleContextType = {
//   generalInfo: FormData["generalInfo"];
//   parentInfo?: FormData["parentInfo"];
//   studentInfo?: FormData["studentInfo"];
//   teacherInfo?: FormData["teacherInfo"];
//   setGeneralInfo: (generalInfo: FormData["generalInfo"]) => void;
//   setParentInfo: (parentInfo: FormData["parentInfo"]) => void;
//   setStudentInfo: (studentInfo: FormData["studentInfo"]) => void;
//   setTeacherInfo: (teacherInfo: FormData["teacherInfo"]) => void;
//   role: Role; // Define the role type as "teacher" | "student" | "parent"
//   setRole: (role: Role) => void; // Function to update the role
//   step: number;
//   setStep: (step: number) => void;
// };

// // Create the RoleContext
// export const RoleContext = createContext<RoleContextType | undefined>(
//   undefined,
// );

// // RoleProvider to wrap around components that need access to RoleContext
// const RoleProvider = ({ children }: { children: React.ReactNode }) => {
//   const [role, setRole] = useState<Role>("student"); // Default role is "teacher"
//   const [step, setStep] = useState<number>(0);
//   // const [generalInfo, setGeneralInfo] = useState<FormData["generalInfo"]>({
//   //   firstName: "",
//   //   lastName: "",
//   //   phoneNumber: "",
//   // });
//   const [parentInfo, setParentInfo] = useState<FormData["parentInfo"]>();
//   const [studentInfo, setStudentInfo] = useState<FormData["studentInfo"]>();
//   const [teacherInfo, setTeacherInfo] = useState<FormData["teacherInfo"]>();

//   return (
//     <RoleContext.Provider
//       value={{
//         role,
//         setRole,
//         step,
//         setStep,
//         // generalInfo,
//         // setGeneralInfo,
//         parentInfo,
//         setParentInfo,
//         studentInfo,
//         setStudentInfo,
//         teacherInfo,
//         setTeacherInfo,
//       }}
//     >
//       {children}
//     </RoleContext.Provider>
//   );
// };

// export default RoleProvider;
