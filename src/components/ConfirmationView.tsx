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
  <img src="/logo.svg" alt="Strajk logo" className="logo" />

  <h2>See you soon!</h2>

  <h3 className="confirm-details-title">Booking details</h3>

  <div className="confirm-label">When</div>
  <div className="confirm-box">{dateTime}</div>

  <div className="confirm-label">Who</div>
  <div className="confirm-box">{booking.people}</div>

  <div className="confirm-label">Lanes</div>
  <div className="confirm-box">{booking.lanes}</div>

  <div className="confirm-label">Booking number</div>
  <div className="confirm-box">{booking.bookingId}</div>

  <div className="total-line">
    <span className="label">total</span>
    <span className="price">{booking.price} kr</span>
  </div>

  <button className="confirm-button" onClick={onNewBooking}>
    Sweet, let's go!
  </button>
</section>

  );
};
