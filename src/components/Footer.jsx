import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";

const links = [
  {
    href: "",
    icon: <FaFacebook />,
  },
  {
    href: "",
    icon: <FaGithub />,
  },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-yellow-800 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <p className="text-center text-sm md:text-left">
          &copy; Beer Nova 2024. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {links.map((link) => (
            <a
              key={link}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
