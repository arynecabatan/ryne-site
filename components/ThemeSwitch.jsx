import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      className="w-11 h-11 bg-sizzlingred/20 rounded-xl dark:bg-sizzlingred/40 flex items-center justify-center hover:ring-2 ring-sizzlingred dark:ring-culturedwhite transition-all duration-300 focus:outline-none"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ?
      (<FiMoon className="text-sizzlingred w-6 h-6" />)
      : (<FiSun className="text-culturedwhite w-6 h-6" />)}
    </button>
  );
};

export default ThemeSwitch;