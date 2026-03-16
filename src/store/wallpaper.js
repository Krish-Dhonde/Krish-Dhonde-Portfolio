import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWallpaperStore = create(
  persist(
    (set) => ({
      wallpaper: "/images/wallpaper.png",
      setWallpaper: (wallpaper) => set({ wallpaper }),
    }),
    {
      name: "wallpaper-storage",
    }
  )
);

export default useWallpaperStore;
