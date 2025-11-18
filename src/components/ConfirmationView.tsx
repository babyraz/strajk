import React from "react";
import type { BookingDetails } from "../types/booking";

interface ConfirmationViewProps {
  booking: BookingDetails;
  onNewBooking: () => void;
}


export const ConfirmationView: React.FC<ConfirmationViewProps> = ({
    booking,
    onNewBooking,
  }) => {
    if (!booking) {
      return <p>Laddar bekräftelse...</p>;
    }
  
    const dateTime = booking.when.replace("T", " ");

  return (
    <section className="confirmation-view">
      <h2>Bokning bekräftad!</h2>

      <div className="card">
        <p><strong>Bokningsnummer:</strong> {booking.id}</p>
        <p><strong>Datum & tid:</strong> {dateTime}</p>
        <p><strong>Banor:</strong> {booking.lanes}</p>
        <p><strong>Spelare:</strong> {booking.people}</p>
        <p><strong>Skor:</strong> {booking.shoes.join(", ")}</p>
        <p><strong>Pris:</strong> {booking.price} kr</p>
      </div>

      <button onClick={onNewBooking} className="new-booking-button">
        Gör en ny bokning
      </button>
    </section>
  );
};
