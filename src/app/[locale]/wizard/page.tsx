import SignUpWizard from "./SignUpWizard";

const WizardPage = () => {

  return (
    <main className="container flex max-w-2xl flex-col items-center justify-between gap-4 px-8">
      <div>
        <h1 className="text-center text-3xl">
          Welcom, <span className="ml-2 font-bold">Youssef !👋</span>
        </h1>
        <h3 className="mt-2 text-center text-sm text-muted-foreground">
          You can always change your account settings later.
        </h3>
      </div>
      <SignUpWizard />
    </main>
  );
};

export default WizardPage;
