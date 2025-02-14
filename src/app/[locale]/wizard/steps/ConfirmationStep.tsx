export default function ConfirmationStep() {
  return <div></div>;
}

// import LoadingButton from "@/components/LoadingButton";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useRole } from "@/hooks/useRole";
// import { ProgressIndicator } from "../../onboarding/_components/ProgressIndicator";

// export default function ConfirmationStep() {
//   const {
//     step,
//     setStep,
//     role,
//     generalInfo,
//     parentInfo,
//     studentInfo,
//     teacherInfo,
//   } = useRole();
//   return (
//     <Card className="w-full space-y-4">
//       <CardHeader>
//         <CardTitle>Please confirm your information</CardTitle>
//         <ProgressIndicator currentStep={step} totalSteps={4} />
//       </CardHeader>
//       <CardContent>
//         <ul className="list-disc pl-5">
//           <li>
//             Name: {generalInfo.firstName} {generalInfo.lastName}
//           </li>
//           <li>Phone: {generalInfo.phoneNumber}</li>
//           <li className="capitalize">Role: {role}</li>
//           {role === "teacher" && (
//             <>
//               <li>Subject: {teacherInfo?.subject}</li>
//               <li>Years of Experience:{teacherInfo?.yearsOfExperience}</li>
//             </>
//           )}
//           {role === "student" && (
//             <>
//               <li>Grade: {studentInfo?.childName}</li>
//               <li>School: {studentInfo?.childGrade}</li>
//             </>
//           )}
//           {role === "parent" && (
//             <>
//               <li>Child&apos;s Name: {parentInfo?.childName}</li>
//               <li>Child&apos;s Grade: {parentInfo?.childGrade}</li>
//             </>
//           )}
//         </ul>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => setStep(step - 1)}
//         >
//           Previous
//         </Button>
//         <Button type="submit" variant="outline" className="select-none">
//           Next
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
