import { type ReactNode, MouseEvent } from "react";

type ButtonProps = {
  children: ReactNode;
  type:
    | "navButton"
    | "welcomeButton"
    | "logInButton"
    | "createCollectionButton"
    | "sortByButton"
    | "viewItemsButton"
    | "editProfileButton";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ children, onClick, type }: ButtonProps) {
  const base =
    "inline-block text-xs bg-black font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-green focus:bg-green focus:outline-none disabled:cursor-not-allowed";

  const styles = {
    navButton: base + " rounded-full px-4 py-2",
    welcomeButton:
      "border border-black rounded-full bg-white inline-flex items-center justify-center py-3 px-5 text-center text-sm font-medium text-black hover:bg-body-color hover:border-body-color",
    logInButton:
      "w-full cursor-pointer rounded-md border border-primary bg-black px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90",
    createCollectionButton:
      "flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
    sortByButton:
      "flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none",
    viewItemsButton:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-1",
    editProfileButton: base + " rounded-full px-4 py-2 md:px-5 md:py-2.5 text-xs"
  };

  return (
    <button className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}
