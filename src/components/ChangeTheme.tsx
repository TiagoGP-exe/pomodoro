import { useTheme } from "next-themes";
import { IconMoonStars, IconSun } from "tabler-icons";

export const ChangeTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-gray-800 active:scale-95 transition-transform"
    >
      {currentTheme == "dark" ? <IconSun /> : <IconMoonStars />}
    </button>
  );
};
