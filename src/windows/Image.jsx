import { WindowControls } from "#components";
import windowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";
import React from "react";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2 className="truncate">{data.name}</h2>
      </div>

      <div className="bg-[#1c1c1e] p-4 sm:p-8 h-full w-full overflow-auto flex items-center justify-center relative">
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt={data.name}
            className="max-w-full max-h-full object-contain drop-shadow-2xl"
          />
        )}
      </div>
    </>
  );
};

const ImageWindow = windowWrapper(Image, "imgfile");

export default ImageWindow;
