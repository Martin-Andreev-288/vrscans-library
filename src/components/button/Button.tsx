import { type ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type: "navButton" | "welcomeButton" | "logInButton";
};

export default function Button({ children, type }: ButtonProps) {
  const base =
    "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    navButton: base + " px-4 py-3 md:px-6 md:py-4",
    welcomeButton:
      "border border-black rounded-full bg-white inline-flex items-center justify-center py-3 px-5 text-center text-sm font-medium text-black hover:bg-body-color hover:border-body-color",
    logInButton:
      "w-full cursor-pointer rounded-md border border-primary bg-black px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
  };

  return <button className={styles[type]}>{children}</button>;
}
