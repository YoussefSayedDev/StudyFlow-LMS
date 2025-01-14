import signInImage from "@/assets/images/auth/sign-in-image.jpg";
import Image from "next/image";
import Link from "next/link";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <main className="auth-container">
      {/* Form Section */}
      <section className="auth-form">
        <div className="form-content">
          <h1 className="text-2xl font-semibold">Sign In to your account.</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Sign in to your account to manage your profile
          </p>
          <div className="my-8">
            <SignInForm />
          </div>
          <Link href="/sign-up" className="block text-center hover:underline">
            Don&apos;t have an account?{" "}
            <span className="text-purple-500">Sign Up</span>
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
