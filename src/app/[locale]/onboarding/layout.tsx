import LanguageSelector from "@/components/Localization/LanguageSelector";

const WizardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <main className="container flex max-w-2xl flex-col items-center justify-between gap-4 px-8">
        <div>
          <h1 className="text-center text-3xl">
            Welcom to <span className="ml-2 font-bold">StudyFlow !👋</span>
          </h1>
          <h3 className="mt-2 text-center text-sm text-muted-foreground">
            You can always change your account settings later.
          </h3>
        </div>
        {children}
      </main>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 p-4">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default WizardLayout;
