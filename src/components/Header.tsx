import { ChangeTheme } from "./ChangeTheme";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="flex items-center justify-center w-full h-20 px-4 fixed top-0 bg-slate-50  dark:bg-gray-800/50">
      <div className="flex items-center max-w-screen-lg w-full justify-between">
        <Logo />
        <ChangeTheme />
      </div>
    </header>
  );
};
