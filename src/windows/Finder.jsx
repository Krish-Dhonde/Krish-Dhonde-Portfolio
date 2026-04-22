import { WindowControls } from "#components";
import windowWrapper from "#hoc/windowWrapper";
import { Search } from "lucide-react";
import useLocationStore from "#store/location";
import clsx from "clsx";
import { locations } from "#constants";
import useWindowStore from "#store/window";
import { Howl } from "howler";
import React, { useMemo, useState } from "react";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const [searchQuery, setSearchQuery] = useState("");
  const type1Sound = useMemo(() => new Howl({ src: ['/sounds/type-1.wav'], html5: true }), []);
  const type2Sound = useMemo(() => new Howl({ src: ['/sounds/type-2.wav'], html5: true }), []);

  const handleTyping = (e) => {
    if (e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Meta') {
      if (Math.random() > 0.5) {
        type1Sound.play();
      } else {
        type2Sound.play();
      }
    }
  };

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active",
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const breadcrumbs = useMemo(() => {
    const findPath = (target, current = null, path = []) => {
      const currentLoc = current || locations;
      if (!current) {
        for (const loc of Object.values(locations)) {
          const res = findPath(target, loc, [loc]);
          if (res) return res;
        }
        return null;
      }
      if (current.id === target.id) return path;
      if (current.children) {
        for (const child of current.children) {
          const res = findPath(target, child, [...path, child]);
          if (res) return res;
        }
      }
      return null;
    };
    return findPath(activeLocation);
  }, [activeLocation]);

  return (
    <>
      <div id="window-header" className="flex items-center gap-4">
        <div className="flex items-center gap-4 shrink-0">
          <WindowControls target="finder" />
          <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 overflow-hidden max-w-[300px] whitespace-nowrap">
            {breadcrumbs?.map((crumb, index) => (
              <React.Fragment key={crumb.id}>
                <span 
                  className="hover:text-blue-500 hover:underline cursor-pointer transition-colors"
                  onClick={() => setActiveLocation(crumb)}
                >
                  {crumb.name}
                </span>
                {index < breadcrumbs.length - 1 && <span className="text-gray-300 dark:text-white/20 select-none">/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 w-48 transition-colors duration-300">
            <Search size={14} className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Search" 
              className="outline-none bg-transparent text-xs w-full dark:text-white placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleTyping}
            />
          </div>
        </div>
      </div>
      <div className="bg-white flex h-full w-full">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>

        <ul className="content">
          {activeLocation?.children.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");

export default FinderWindow;
