import React, { useState, useEffect } from "react";
import type { BookingDetails } from "./types/booking";
import { BookingView } from "./components/BookingView";
import { ConfirmationView } from "./components/ConfirmationView";
import { Menu } from "./components/Menu";
import { LoadingScreen } from "./components/LoadingScreen";

type View = "booking" | "confirmation";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("booking");
  const [bookingResponse, setBookingResponse] = useState<BookingDetails | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="app">
      <header className="header">
        <button
          className="navicon"
          aria-label="Öppna meny"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
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
            onBookingSuccess={(booking) => {
              console.log("📦 Booking details:", booking);
              setBookingResponse(booking);
              setCurrentView("confirmation");
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
