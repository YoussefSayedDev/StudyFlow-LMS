import RoleProvider from "@/context/RoleContext";
import PageRole from "../_components/PageRole";

export default function HomePage() {
  return (
    <RoleProvider>
      <PageRole />
    </RoleProvider>
  );
}
