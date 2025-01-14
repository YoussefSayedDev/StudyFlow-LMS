import signUpImage from "@/assets/images/auth/sign-up-image.jpg";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
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
          <h1 className="text-2xl font-semibold">Sign Up for Free.</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Create an account to access all features.
          </p>
          <div className="my-8">
            <SignUpForm />
          </div>
          <Link href="/sign-in" className="block text-center hover:underline">
            Already have an account?{" "}
            <span className="text-purple-500">Sign In</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
