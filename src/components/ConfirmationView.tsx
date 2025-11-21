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
      return <p>Loading confirmation...</p>;
    }

  
    const dateTime = booking.when.replace("T", " ");

  return (
    <section className="confirmation-view">
      <img className="logo" src="/logo.svg" alt="Strajk logo" />
      <h2>See you soon!</h2>

      <div className="card">
      <p><strong>Bookingnumber:</strong> {booking.bookingId}</p>
        <p><strong>Date and time:</strong> {dateTime}</p>
        <p><strong>Lanes:</strong> {booking.lanes}</p>
        <p><strong>Players:</strong> {booking.people}</p>
        <p><strong>Shoes:</strong> {booking.shoes.join(", ")}</p>
        <p><strong>Total:</strong> {booking.price} kr</p>
      </div>

      <button onClick={onNewBooking} className="strike-button">
        Make another booking
      </button>
    </section>
  );
};
