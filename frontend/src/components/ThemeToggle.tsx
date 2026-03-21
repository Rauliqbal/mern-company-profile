import { MoonStar, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <MoonStar />
      ) : (
        <Sun />
      )}
    </Button>
  );
};

export default ThemeToggle;