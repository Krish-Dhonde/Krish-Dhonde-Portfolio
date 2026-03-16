import windowWrapper from "#hoc/windowWrapper";
import { WindowControls } from "#components";
import useWallpaperStore from "#store/wallpaper";
import clsx from "clsx";

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

  return (
    <>
      <div id="window-header">
        <WindowControls target="settings" />
        <p className="font-bold text-[#5f6266] flex-1 text-center pe-5">
          System Settings
        </p>
      </div>
      
      <div className="flex bg-white h-[60vh] md:h-[70vh]">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50/50 border-r border-gray-200 p-4 shrink-0 max-sm:w-16">
          <h3 className="text-xs font-semibold text-gray-500 mb-3 max-sm:hidden">Settings</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-3 px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer shadow-sm">
              <span className="max-sm:hidden">Wallpaper</span>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto w-full">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Wallpaper</h2>
          
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
              Desktop Pictures
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {wallpapers.map((img, index) => (
                <div 
                  key={index} 
                  className={clsx(
                    "relative aspect-video rounded-md overflow-hidden cursor-pointer ring-offset-2 transition-all hover:scale-105",
                    wallpaper === img ? "ring-2 ring-blue-500 shadow-md" : "ring-1 ring-gray-200"
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
      </div>
    </>
  );
};

export default windowWrapper(Settings, "settings");
