import { Navbar, Welcome, Dock, Home } from "#components";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import { Finder, Resume, Safari, Terminal, Text, Image, Contact, Settings } from "#windows";
import useWallpaperStore from "#store/wallpaper";
import useThemeStore from "#store/theme";
import { useEffect } from "react";

gsap.registerPlugin(Draggable);

const App = () => {
  const { wallpaper } = useWallpaperStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      if (theme === "dark" || (theme === "system" && mediaQuery.matches)) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    // Listen for system changes if system theme is selected
    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  return (
    <main 
      className="bg-cover bg-no-repeat bg-center transition-colors duration-500" 
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Settings />
      <Home />
    </main>
  );
};

export default App;
