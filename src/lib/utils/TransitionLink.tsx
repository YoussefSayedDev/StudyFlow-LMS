"use client";

import { useRouter } from "@/i18n/routing";
import Link from "next/link";

interface TransitionLinkProps {
  children: React.ReactNode;
  href: string;
  [key: string]: any;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function TransitionLink({
  children,
  href,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const container = document.getElementById("container");

    container?.classList.add("page-transition");

    await sleep(500);

    router.push(href);

    await sleep(500);

    container?.classList.remove("page-transition");
  };
  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
}
