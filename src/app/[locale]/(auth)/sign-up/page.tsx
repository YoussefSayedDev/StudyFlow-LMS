import signUpImage from "@/assets/images/auth/sign-up-image.jpg";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import SignUpForm from "./SignUpForm";

export default async function SignUpPage() {
  const t = await getTranslations("auth.signUp");

  const locale = await getLocale();

  console.log("locale", locale);
  return (
    <main className="auth-container">
      {/* Form Section */}
      <section className="auth-form">
        <div className="form-content">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="mt-2 text-base text-muted-foreground">
            {t("description")}
          </p>
          <div className="my-8">
            <SignUpForm />
          </div>
          <Link href="/sign-in" className="block text-center hover:underline">
            {t("hasAccount")}
            <span className="text-purple-500"> {t("signIn")}</span>
          </Link>
        </div>
      </section>

      {/* Image Section */}
      <aside className="auth-image">
        <Image
          src={signUpImage}
          alt="Decorative signup image"
          width={500}
          height={500}
          className="h-full w-full object-cover"
          priority
          loading="eager"
          placeholder="blur"
        />
      </aside>
    </main>
  );
}
