import { type ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type: "navButton";
};

export default function Button({ children, type }: ButtonProps) {
  const base =
    "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    navButton: base + " px-4 py-3 md:px-6 md:py-4"
  };

  return <button className={styles[type]}>{children}</button>;
}
