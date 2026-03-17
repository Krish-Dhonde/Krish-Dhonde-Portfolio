import { WindowControls } from "#components";
import { socials } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import React from "react";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <h3>Let's Connect...</h3>
        <div className="flex items-center gap-6">
          <img
            src="/images/krish.jpeg"
            alt="krish"
            className="w-24 rounded-full"
          />
          <p>
            I'm always open to new opportunities, collaborations, and
            conversations. Whether you have a project in mind, a question, or
            just want to say hi, feel free to reach out!
          </p>
        </div>
        <div className="flex items-center gap-5">
          <p>
            {" "}
            <span className="font-semibold">Email:</span>{" "}
            <span className="text-blue-500 italic">
              krishdhonde25@gmail.com{" "}
            </span>
          </p>
          <p>
            {" "}
            <span className="font-semibold">WhatsApp:</span>{" "}
            <span className="text-sm text-blue-500 italic">
              +91 9561470970{" "}
            </span>
          </p>
        </div>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = windowWrapper(Contact, "contact");

export default ContactWindow;
