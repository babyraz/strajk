import React, { useState } from "react";
import type { BookingResponse } from "./types/booking";
import { BookingView } from "./components/BookingView";
import { ConfirmationView } from "./components/ConfirmationView";
import { Menu } from "./components/Menu";

type View = "booking" | "confirmation";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("booking");
  const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <button
          className="navicon"
          aria-label="Öppna meny"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {/* enkel ”hamburger”-ikon */}
          <span />
          <span />
          <span />
        </button>
        <h1>Strajk Bowling</h1>
      </header>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        {currentView === "booking" && (
          <BookingView
          onBookingSuccess={(response) => {
            console.log("📦 Booking API response:", response);
          
            if (response?.bookingDetails) {
              setBookingResponse(response.bookingDetails); // plocka ut rätt data
              setCurrentView("confirmation");
            } else {
              console.error("Booking response saknar bookingDetails:", response);
            }
          }}
          />
        )}

        {currentView === "confirmation" && bookingResponse && (
          <ConfirmationView
            booking={bookingResponse}
            onNewBooking={() => {
              setBookingResponse(null);
              setCurrentView("booking");
            }}
          />
        )}
      </main>
    </div>
  );
};

export default App;
