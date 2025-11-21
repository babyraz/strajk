import React from "react";

interface MenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (view: "booking" | "confirmation") => void;
}
export const Menu: React.FC<MenuProps> = ({ open, onClose, onNavigate }) => {
  if (!open) return null;

  return (
    <div className="menu-overlay" onClick={onClose}>
      <nav className="menu" onClick={(e) => e.stopPropagation()}>
        <button className="menu-close" onClick={onClose} aria-label="Stäng meny">
          <span />
          <span />
          <span />
        </button>
        <ul>


          <li>
            <button
              className="menu-link"
              onClick={() => {
                onNavigate("booking");
                onClose();
              }}
            >
              Booking
            </button>
          </li>

          <li>
            <button
              className="menu-link"
              onClick={() => {
                onNavigate("confirmation");
                onClose();
              }}
            >
              Confirmation
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

