import RoleProvider from "@/context/RoleContext";
import PageRole from "./pages/PageRole";

export default function HomePage() {
  return (
    <RoleProvider>
      <PageRole />
    </RoleProvider>
  );
}
