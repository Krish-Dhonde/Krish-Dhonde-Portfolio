import { navLinks, navIcons } from "#constants";
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";
import { Sun, Moon } from "lucide-react";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { theme, setTheme } = useThemeStore();
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="dark:bg-black/50 transition-colors duration-300">
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold dark:text-white transition-colors">Krish's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p className="dark:text-gray-200">{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
          <ul className="flex items-center gap-2">
            <li>
                <button 
                  onClick={toggleTheme} 
                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors dark:text-gray-200"
                  title="Toggle Theme"
                >
                  {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
                </button>
            </li>
            {navIcons.map(({ id, img }) => (
                <li key={id}>
                    <img src={img} className="icon-hover dark:invert transition-all" alt={`icon-${id}`} />
                </li>
            ))}
          </ul>

          <time className="dark:text-white transition-colors">{time.format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
