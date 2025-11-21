import React, { useState } from "react";
import type { BookingRequest, BookingDetails } from "../types/booking";
import { createBooking } from "../api/bookingApi";

interface BookingViewProps {
  onBookingSuccess: (booking: BookingDetails) => void;
}

const MAX_PER_LANE = 4;

export const BookingView: React.FC<BookingViewProps> = ({ onBookingSuccess }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [lanesInput, setLanesInput] = useState("1");
  const lanes = Number(lanesInput) || 0;

  const [peopleInput, setPeopleInput] = useState("1");
  const people = Number(peopleInput) || 0;

  const [shoes, setShoes] = useState<string[]>([""]);

  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePeopleChange = (raw: string) => {
    if (raw === "") {
      setPeopleInput("");
      setShoes([]);
      return;
    }

    const numeric = Number(raw);
    if (isNaN(numeric) || numeric < 0) return;

    setPeopleInput(raw);

    setShoes((prev) => {
      const copy = [...prev];
      if (numeric > copy.length) {
        while (copy.length < numeric) copy.push("");
      } else if (numeric < copy.length) {
        copy.length = numeric;
      }
      return copy;
    });
  };

  const handleLanesChange = (raw: string) => {
    if (raw === "") {
      setLanesInput("");
      return;
    }

    const numeric = Number(raw);
    if (isNaN(numeric) || numeric < 0) return;

    setLanesInput(raw);
  };

  const validate = (): boolean => {
    setFieldError(null);
    setError(null);

    if (!date || !time) {
      setFieldError("Choose date and time.");
      return false;
    }

    if (people <= 0 || lanes <= 0) {
      setFieldError("Add at least 1 player and lane.");
      return false;
    }

    if (people > lanes * MAX_PER_LANE) {
      setFieldError(`Max ${MAX_PER_LANE} players per lane`);
      return false;
    }

    if (shoes.length !== people || shoes.some((s) => s.trim() === "")) {
      setFieldError("Choose a shoe size for each player");
      return false;
    }

    const allNumbers = shoes.every((s) => {
      const n = Number(s);
      return Number.isInteger(n) && n > 0;
    });

    if (!allNumbers) {
      setFieldError("Not a correct shoe size");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    const when = `${date}T${time}`;
    const shoesNumbers = shoes.map((s) => Number(s));

    const bookingReq: BookingRequest = {
      when,
      lanes: Number(lanesInput),
      people: Number(peopleInput),
      shoes: shoesNumbers,
    };

    try {
      const response = await createBooking(bookingReq);
      onBookingSuccess(response.bookingDetails);
    } catch (err) {
      console.error(err);
      setError("Your booking could not be processed at the moment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="booking-view">
      <img className="logo" src="/logo.svg" alt="Strajk logo" />
      <h2>Booking</h2>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="time">Time</label>
          <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="lanes">Lanes</label>
          <input
            id="lanes"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={lanesInput}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              handleLanesChange(digits);
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="people">Players</label>
          <input
            id="people"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={peopleInput}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              handlePeopleChange(digits);
            }}
          />
        </div>

        <div className="shoes-section">
          <h3>Shoe sizes</h3>
          {Array.from({ length: people }).map((_, index) => (
            <div className="field" key={index}>
              <label>Player {index + 1}</label>
              <input
                type="number"
                min={20}
                max={60}
                value={shoes[index] ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setShoes((prev) => {
                    const copy = [...prev];
                    copy[index] = value;
                    return copy;
                  });
                }}
              />
            </div>
          ))}
        </div>

        {fieldError && <p className="error">{fieldError}</p>}
        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading} className="strike-button">
          {loading ? "Booking..." : "Strike!"}
        </button>
      </form>
    </section>
  );
};
