"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem("theme") === "dark";
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
  }, []);
  function toggle() {
    const v = !dark;
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
    localStorage.setItem("theme", v ? "dark" : "light");
  }
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
