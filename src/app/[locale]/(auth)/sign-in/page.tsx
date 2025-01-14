import signInImage from "@/assets/images/auth/sign-in-image.jpg";
import { getCurrentLocale } from "@/utils/getCurrentLocale";
import getTrans from "@/utils/translation";
import Image from "next/image";
import Link from "next/link";
import SignInForm from "./SignInForm";

export default async function SignInPage() {
  const locale = getCurrentLocale();
  const { signIn } = await getTrans(locale);
  return (
    <main className="auth-container">
      {/* Form Section */}
      <section className="auth-form">
        <div className="form-content">
          <h1 className="text-2xl font-semibold">{signIn.title}</h1>
          <p className="mt-2 text-base text-muted-foreground">
            {signIn.description}
          </p>
          <div className="my-8">
            <SignInForm locale={locale} translations={signIn.signInForm} />
          </div>
          <Link
            href={`/${locale}/sign-up`}
            className="block text-center hover:underline"
          >
            {signIn.noAccount}
            <span className="text-purple-500"> {signIn.signUp}</span>
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
