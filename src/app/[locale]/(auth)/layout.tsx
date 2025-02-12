import LanguageSelector from "@/components/Localization/LanguageSelector";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative">
      {children}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 p-4">
        <LanguageSelector />
      </div>
    </div>
  );
}
