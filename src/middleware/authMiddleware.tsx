// "use client";

// import { useAppSelector } from "@/hooks/redux";
// import { Role } from "@/types"; // Assuming you have Role enum defined
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export function withAuth(
//   WrappedComponent: React.ComponentType<any>,
//   allowedRoles: Role[],
// ) {
//   return function AuthenticatedComponent(props: any) {
//     const { user, isAuthenticated } = useAppSelector((state) => state.auth);
//     const router = useRouter();

//     useEffect(() => {
//       if (!isAuthenticated) {
//         router.push("/sign-in");
//         return;
//       }

//       if (user && !allowedRoles.includes(user.role)) {
//         router.push("/unauthorized");
//       }
//     }, [isAuthenticated, user, router]);

//     if (!isAuthenticated) return null;
//     if (user && !allowedRoles.includes(user.role)) return null;

//     return <WrappedComponent {...props} />;
//   };
// }
