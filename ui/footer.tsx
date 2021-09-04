import React from "react";
import Settings from "./settings";

const Footer: React.FC = () => {
  return (
    <footer className="fixed w-full bg-white bottom-0 left-0 p-4">
      <Settings />
    </footer>
  );
};

export default Footer;
