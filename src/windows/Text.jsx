import { WindowControls } from "#components";
import windowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";
import React from "react";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2 className="truncate">{data.name}</h2>
      </div>

      <div className="bg-white p-6 sm:p-8 h-full w-full overflow-y-auto text-black font-sans flex flex-col items-center">
        {data.image && (
          <img
            src={data.image}
            alt={data.name}
            className="w-48 h-48 object-cover rounded-2xl mb-6 shadow-md"
          />
        )}
        
        {data.subtitle && (
          <h3 className="text-xl font-bold mb-6 text-center">{data.subtitle}</h3>
        )}

        <div className="space-y-4 max-w-2xl w-full text-base leading-relaxed">
          {data.description &&
            data.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>
    </>
  );
};

const TextWindow = windowWrapper(Text, "txtfile");

export default TextWindow;
