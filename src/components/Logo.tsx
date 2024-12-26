import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.svg";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-3 rounded-md p-2 py-4"
    >
      <Image
        src={logo}
        alt="Logo"
        width={32}
        height={32}
        className="h-7 w-auto"
      />
      <span className="hidden text-xl font-bold text-primary lg:block">
        StudyFlow
      </span>
    </Link>
  );
};

export default Logo;
