import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { Howl } from "howler";

const Safari = () => {
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

  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />

        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />

          <div className="search">
            <Search className="icon" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1 outline-none bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleTyping}
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="blog">
        <h2>My Developer Blogs</h2>

        <div className="space-y-8">
          {blogPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
            blogPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())).map(({ id, image, title, date, link }) => (
              <div key={id} className="blog-post">
                <div className="col-span-2">
                  <img src={image} alt={title} />
                </div>

                <div className="content">
                  <p>{date}</p>
                  <h3>{title}</h3>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    Read More <MoveRight className="icon-hover" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p>No articles found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const SafariWindow = windowWrapper(Safari, "safari");

export default SafariWindow;
