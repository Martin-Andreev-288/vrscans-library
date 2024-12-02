import { type ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type: "navButton" | "welcomeButton" | "logInButton";
};

export default function Button({ children, type }: ButtonProps) {
  const base =
    "inline-block text-xs rounded-full bg-black font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-green focus:bg-green focus:outline-none disabled:cursor-not-allowed";

  const styles = {
    navButton: base + " px-4 py-2",
    welcomeButton:
      "border border-black rounded-full bg-white inline-flex items-center justify-center py-3 px-5 text-center text-sm font-medium text-black hover:bg-body-color hover:border-body-color",
    logInButton:
      "w-full cursor-pointer rounded-md border border-primary bg-black px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
  };

  return <button className={styles[type]}>{children}</button>;
}
