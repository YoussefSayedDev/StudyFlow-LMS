import signUpImage from "@/assets/images/auth/sign-up-image.jpg";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <main className="flex h-screen items-center justify-center lg:justify-between">
      <div className="hidden h-full w-1/2 lg:block">
        <Image
          src={signUpImage}
          alt="Sign Up"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="flex flex-col lg:w-1/2">
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
      </div>
    </main>
  );
}
