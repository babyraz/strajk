import React from "react";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

export const Menu: React.FC<MenuProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="menu-overlay" onClick={onClose}>
      <nav
        className="menu"
        onClick={(e) => e.stopPropagation()} // hindra stängning när man klickar i menyn
      >
        <button className="menu-close" onClick={onClose} aria-label="Stäng meny">
          ×
        </button>

        <ul>
          <li><a href="#booking">Boka</a></li>
          <li><a href="#prices">Priser</a></li>
          <li><a href="#contact">Kontakt</a></li>
        </ul>
      </nav>
    </div>
  );
};
