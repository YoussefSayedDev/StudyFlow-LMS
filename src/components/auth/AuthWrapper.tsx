"use client";

import { withAuth } from "@/middleware/authMiddleware";
import { Role } from "@/types";

interface AuthWrapperProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

function AuthWrapperBase({ children }: AuthWrapperProps) {
  return <>{children}</>;
}

export const AuthWrapper = (props: AuthWrapperProps) => {
  const WrappedComponent = withAuth(AuthWrapperBase, props.allowedRoles);
  return <WrappedComponent {...props} />;
};
