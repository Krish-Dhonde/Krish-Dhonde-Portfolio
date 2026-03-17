import windowWrapper from "#hoc/windowWrapper";
import { WindowControls } from "#components";
import useWallpaperStore from "#store/wallpaper";
import useThemeStore from "#store/theme";
import clsx from "clsx";
import { useState } from "react";
import { Monitor, Sun, Moon, Image as ImageIcon, Palette } from "lucide-react";

const wallpapers = [
  "/images/wallpaper.png",
  "/images/wallpaper2.jpg",
  "/images/wallpaper3.jpg",
  "/images/wallpaper4.jpg",
  "/images/wallpaper5.jpg",
  "/images/wallpaper6.jpg",
  "/images/wallpaper7.jpg",
  "/images/wallpaper8.jpg",
];

const Settings = () => {
  const { wallpaper, setWallpaper } = useWallpaperStore();
  const { theme, setTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState("appearance");

  return (
    <>
      <div id="window-header" className="dark:bg-[#2d2d2d] dark:border-gray-700 transition-colors duration-300">
        <WindowControls target="settings" />
        <p className="font-bold text-[#5f6266] dark:text-gray-300 flex-1 text-center pe-5 transition-colors">
          System Settings
        </p>
      </div>
      
      <div className="flex bg-white dark:bg-[#1e1e1e] h-[60vh] md:h-[70vh] transition-colors duration-300 rounded-b-xl">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50/50 dark:bg-[#252525] border-r border-gray-200 dark:border-gray-800 p-4 shrink-0 max-sm:w-16 transition-colors duration-300 overflow-y-auto">
          <ul className="space-y-1">
            <li 
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors",
                activeTab === "appearance" 
                  ? "bg-blue-500 text-white shadow-sm" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]"
              )}
              onClick={() => setActiveTab("appearance")}
            >
              <Palette size={18} />
              <span className="max-sm:hidden">Appearance</span>
            </li>
            <li 
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors",
                activeTab === "wallpaper" 
                  ? "bg-blue-500 text-white shadow-sm" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]"
              )}
              onClick={() => setActiveTab("wallpaper")}
            >
              <ImageIcon size={18} />
              <span className="max-sm:hidden">Wallpaper</span>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto w-full">
          {activeTab === "appearance" && (
            <div className="animate-in fade-in duration-300">
               <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 transition-colors">Appearance</h2>
               
               <div className="bg-white dark:bg-[#2A2A2A] rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm transition-colors duration-300">
                 <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                   Theme Customization
                 </h3>
                 
                 <div className="flex gap-4">
                    {/* Light Theme Option */}
                    <button 
                      onClick={() => setTheme("light")}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className={clsx(
                        "w-24 h-16 rounded-md border-2 overflow-hidden flex items-center justify-center transition-all bg-gray-100",
                        theme === "light" ? "border-blue-500 ring-2 ring-blue-500/30" : "border-gray-200 hover:border-blue-400"
                      )}>
                        <Sun className="text-amber-500" size={24} />
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300">Light</span>
                    </button>

                    {/* Dark Theme Option */}
                    <button 
                      onClick={() => setTheme("dark")}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className={clsx(
                        "w-24 h-16 rounded-md border-2 overflow-hidden flex items-center justify-center transition-all bg-slate-800",
                        theme === "dark" ? "border-blue-500 ring-2 ring-blue-500/30" : "border-gray-700 hover:border-blue-400"
                      )}>
                        <Moon className="text-blue-300" size={24} />
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300">Dark</span>
                    </button>

                    {/* System Theme Option */}
                    <button 
                      onClick={() => setTheme("system")}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className={clsx(
                         "w-24 h-16 rounded-md border-2 overflow-hidden flex items-center justify-center transition-all bg-gradient-to-r from-gray-100 to-slate-800",
                        theme === "system" ? "border-blue-500 ring-2 ring-blue-500/30" : "border-gray-400 hover:border-blue-400 dark:border-gray-600"
                      )}>
                        <Monitor className="text-gray-500 dark:text-gray-400" size={24} />
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300">Auto</span>
                    </button>
                 </div>
                 
                 <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    Auto adjusts appearance based on your system preferences.
                 </p>
               </div>
            </div>
          )}

          {activeTab === "wallpaper" && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 transition-colors">Wallpaper</h2>
              
              <div className="bg-white dark:bg-[#2A2A2A] rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm transition-colors duration-300">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                  Desktop Pictures
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {wallpapers.map((img, index) => (
                    <div 
                      key={index} 
                      className={clsx(
                        "relative aspect-video rounded-md overflow-hidden cursor-pointer ring-offset-2 dark:ring-offset-[#2A2A2A] transition-all hover:scale-105",
                        wallpaper === img ? "ring-2 ring-blue-500 shadow-md" : "ring-1 ring-gray-200 dark:ring-gray-700"
                      )}
                      onClick={() => setWallpaper(img)}
                    >
                      <img 
                        src={img} 
                        alt={`Wallpaper ${index + 1}`} 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                      />
                      {wallpaper === img && (
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                          <div className="bg-blue-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default windowWrapper(Settings, "settings");
