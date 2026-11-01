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
      className="rounded-full border border-[#d8c39a] bg-[#f8f1df] p-2 text-[#0a1d2d] transition hover:bg-[#f1e2b1] dark:border-[#6d5c36] dark:bg-[#102438] dark:text-[#f3d68a]"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
