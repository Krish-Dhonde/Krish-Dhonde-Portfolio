import { Navbar, Welcome, Dock, Home } from "#components";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import { Finder, Resume, Safari, Terminal, Text, Image, Contact, Settings } from "#windows";
import useWallpaperStore from "#store/wallpaper";

gsap.registerPlugin(Draggable);

const App = () => {
  const { wallpaper } = useWallpaperStore();

  return (
    <main 
      className="bg-cover bg-no-repeat bg-center" 
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
