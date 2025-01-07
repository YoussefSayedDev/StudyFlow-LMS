import signInImage from "@/assets/images/auth/sign-in-image.jpg";
import Image from "next/image";
import Link from "next/link";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <main className="flex h-screen items-center justify-center lg:justify-between">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="flex flex-col lg:w-1/2">
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
      </div>
      <div className="hidden h-full w-1/2 lg:block">
        <Image
          src={signInImage}
          alt="Sign Up"
          className="h-full w-full object-cover"
        />
      </div>
    </main>
  );
}
