import signUpImage from "@/assets/images/auth/sign-up-image.jpg";
import { getCurrentLocale } from "@/utils/getCurrentLocale";
import getTrans from "@/utils/translation";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default async function SignUpPage() {
  const locale = getCurrentLocale();
  const { signUp } = await getTrans(locale);
  return (
    <main className="auth-container">
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

      {/* Form Section */}
      <section className="auth-form">
        <div className="form-content">
          <h1 className="text-2xl font-semibold">{signUp.title}</h1>
          <p className="mt-2 text-base text-muted-foreground">
            {signUp.description}
          </p>
          <div className="my-8">
            <SignUpForm locale={locale} translations={signUp.signUpForm} />
          </div>
          <Link
            href={`/${locale}/sign-in`}
            className="block text-center hover:underline"
          >
            {signUp.noAccount}
            <span className="text-purple-500"> {signUp.signIn}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
