import signInImage from "@/assets/images/auth/sign-in-image.jpg";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import SignInForm from "./SignInForm";

export default async function SignInPage() {
  const t = await getTranslations("auth.signIn");

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
            <SignInForm />
          </div>
          <Link href="/sign-up" className="block text-center hover:underline">
            {t("noAccount")}
            <span className="text-purple-500"> {t("signUp")}</span>
          </Link>
        </div>
      </section>

      {/* Image Section */}
      <aside className="auth-image">
        <Image
          src={signInImage}
          alt="Decorative signin image"
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
