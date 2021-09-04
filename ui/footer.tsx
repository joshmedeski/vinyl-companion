import React from "react";
import Settings from "./settings";

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-0 left-0 text-blue-500 p-2">
      <Settings />
    </footer>
  );
};

export default Footer;
