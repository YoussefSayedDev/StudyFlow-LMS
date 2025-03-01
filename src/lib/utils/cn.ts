import clsx from "clsx";

const cn = (...classNames: (string | false | null | undefined)[]) => {
  return clsx(...classNames);
};

export { cn };
