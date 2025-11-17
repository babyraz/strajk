import React, { useState } from "react";
import type { BookingRequest, BookingResponse } from "../types/booking";
import { createBooking } from "../api/bookingApi";

interface BookingViewProps {
  onBookingSuccess: (booking: BookingResponse) => void;
}

const MAX_PER_LANE = 4;

export const BookingView: React.FC<BookingViewProps> = ({ onBookingSuccess }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [lanes, setLanes] = useState(1);
  const [people, setPeople] = useState(1);
  const [shoes, setShoes] = useState<string[]>([""]);

  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hantera ändring av antal spelare
  const handlePeopleChange = (value: number) => {
    const newPeople = Math.max(1, value);
    setPeople(newPeople);

    setShoes((prev) => {
      const copy = [...prev];
      if (newPeople > copy.length) {
        while (copy.length < newPeople) copy.push("");
      } else if (newPeople < copy.length) {
        copy.length = newPeople;
      }
      return copy;
    });
  };

  const validate = (): boolean => {
    // Rensa gamla fel
    setFieldError(null);
    setError(null);

    if (!date || !time) {
      setFieldError("Välj datum och tid.");
      return false;
    }

    if (people <= 0 || lanes <= 0) {
      setFieldError("Antal spelare och banor måste vara minst 1.");
      return false;
    }

    // Max 4 spelare per bana
    if (people > lanes * MAX_PER_LANE) {
      setFieldError(`Max ${MAX_PER_LANE} spelare per bana. Öka antal banor eller minska antal spelare.`);
      return false;
    }

    // Skor: exakt lika många skostorlekar som spelare och inga tomma
    if (shoes.length !== people || shoes.some((s) => s.trim() === "")) {
      setFieldError("Ange en skostorlek för varje spelare.");
      return false;
    }

    // Kolla att varje skostorlek är ett giltigt nummer
    const allNumbers = shoes.every((s) => {
      const n = Number(s);
      return Number.isInteger(n) && n > 0;
    });

    if (!allNumbers) {
      setFieldError("Skostorlekar måste vara positiva heltal.");
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
      lanes,
      people,
      shoes: shoesNumbers,
    };

    try {
      const response = await createBooking(bookingReq);
      onBookingSuccess(response);
    } catch (err: any) {
      console.error(err);
      setError("Tyvärr kunde vi inte genomföra din bokning just nu. Försök igen om en liten stund.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="booking-view">
      <h2>Boka bana</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="date">Datum</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="time">Tid</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="lanes">Banor</label>
          <input
            id="lanes"
            type="number"
            min={1}
            value={lanes}
            onChange={(e) => setLanes(Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label htmlFor="people">Spelare</label>
          <input
            id="people"
            type="number"
            min={1}
            value={people}
            onChange={(e) => handlePeopleChange(Number(e.target.value))}
          />
        </div>

        {/* Skor visas när man valt antal spelare */}
        <div className="shoes-section">
          <h3>Skostorlekar</h3>
          {Array.from({ length: people }).map((_, index) => (
            <div className="field" key={index}>
              <label>Spelare {index + 1}</label>
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
          {loading ? "Bokar..." : "Strike!"}
        </button>
      </form>
    </section>
  );
};
