import { navLinks, navIcons, dockApps, locations } from "#constants";
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";
import useLocationStore from "#store/location";
import { Sun, Moon, Search, X } from "lucide-react";
import dayjs from "dayjs";
import { useState, useEffect, useMemo, useRef } from "react";
import { Howl } from "howler";
import { createPortal } from "react-dom";

// Build a flat searchable index from all openable apps + navLinks + locations
const getSearchIndex = () => {
  const index = [
    ...navLinks.map((l) => ({ id: `nav-${l.id}`, name: l.name, type: l.type, category: "Menu" })),
    ...dockApps
      .filter((a) => a.canOpen)
      .map((a) => ({ id: `dock-${a.id}`, name: a.name, type: a.id, icon: `/icons/${a.icon}`, category: "App" })),
    // Add Locations (About, Work, Resume, etc.)
    ...Object.values(locations).map(loc => ({
      id: `loc-${loc.id}`,
      name: loc.name,
      type: "finder",
      location: loc,
      category: "Location",
      icon: loc.icon
    })),
    // Add individual projects from Work location
    ...(locations.work?.children || []).map(proj => ({
      id: `proj-${proj.id}`,
      name: proj.name,
      type: "finder",
      location: proj,
      category: "Project",
      icon: proj.icon
    })),
    // Add specific settings options
    { id: "set-wallpaper", name: "Settings: Wallpaper", type: "settings", data: "wallpaper", category: "Settings", icon: "/icons/settings.png" },
    { id: "set-appearance", name: "Settings: Appearance", type: "settings", data: "appearance", category: "Settings", icon: "/icons/settings.png" },
    { id: "set-audio", name: "Settings: Audio", type: "settings", data: "audio", category: "Settings", icon: "/icons/settings.png" },
  ];

  // Remove duplicates by type/location combo
  return index.reduce((acc, item) => {
    const isDuplicate = acc.find(x => 
      x.name === item.name && x.type === item.type
    );
    if (!isDuplicate) acc.push(item);
    return acc;
  }, []);
};

const SEARCH_INDEX = getSearchIndex();

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { theme, setTheme } = useThemeStore();
  const { setActiveLocation } = useLocationStore();
  const [time, setTime] = useState(dayjs());
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const type1Sound = useMemo(() => new Howl({ src: ["/sounds/type-1.wav"], html5: true }), []);
  const type2Sound = useMemo(() => new Howl({ src: ["/sounds/type-2.wav"], html5: true }), []);

  useEffect(() => {
    const timer = setInterval(() => setTime(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleTyping = (e) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
      return;
    }
    if (!["Shift", "Control", "Alt", "Meta", "Tab"].includes(e.key)) {
      (Math.random() > 0.5 ? type1Sound : type2Sound).play();
    }
  };

  const openSearchResult = (item) => {
    if (item.location) {
      setActiveLocation(item.location);
    }
    openWindow(item.type, item.data || null);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return SEARCH_INDEX.slice(0, 8); // Show first 8 items if empty
    return SEARCH_INDEX.filter((item) =>
      item.name.toLowerCase().includes(query) || 
      item.category?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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

      <div ref={searchRef} className={`search-capsule ${isSearchOpen ? "active" : ""}`}>
        <Search size={15} className="text-gray-500 dark:text-gray-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search apps…"
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearchOpen(true);
          }}
          onFocus={() => setIsSearchOpen(true)}
          onKeyDown={handleTyping}
        />
        {searchQuery && (
          <button
            className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            onMouseDown={(e) => {
              e.preventDefault();
              setSearchQuery("");
              inputRef.current?.focus();
            }}
          >
            <X size={13} />
          </button>
        )}

        {isSearchOpen && (
          <div className="search-dropdown">
            {searchResults.length > 0 ? (
              <>
                <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {searchQuery ? "Results" : "Suggested"}
                </p>
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    className="search-result-item"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      openSearchResult(item);
                    }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-5 h-5 object-contain"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center">
                          <Search size={10} className="text-blue-500" />
                        </div>
                      )}
                      <span className="text-sm text-gray-800 dark:text-gray-100">{item.name}</span>
                    </div>
                    {item.category && (
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5">
                        {item.category}
                      </span>
                    )}
                  </button>
                ))}
              </>
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
                No results for "<span className="text-gray-600 dark:text-gray-300">{searchQuery}</span>"
              </div>
            )}
          </div>
        )}
      </div>

      {isSearchOpen && createPortal(
        <div 
          className={`search-backdrop ${isSearchOpen ? 'active' : ''}`} 
          onMouseDown={() => setIsSearchOpen(false)}
        />,
        document.body
      )}

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
