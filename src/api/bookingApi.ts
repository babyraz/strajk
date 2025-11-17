import type { BookingRequest, BookingResponse } from "../types/booking";


const BASE_URL = "https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com";

let cachedApiKey: string | null = null;

async function getApiKey(): Promise<string> {
  if (cachedApiKey) return cachedApiKey;

  const res = await fetch(`${BASE_URL}/key`);
  if (!res.ok) {
    throw new Error("Kunde inte hämta API-nyckel");
  }
  const key = await res.text(); // eller res.json() om det är JSON, kolla vad ni fått i instruktionen
  cachedApiKey = key;
  return key;
}

export async function createBooking(
  booking: BookingRequest
): Promise<BookingResponse> {
  const apiKey = await getApiKey();

  const res = await fetch(`${BASE_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(booking),
  });

  if (!res.ok) {
    // Ungefär var 5:e gång blir det fel enligt specen
    const text = await res.text().catch(() => "");
    throw new Error(text || "Ett fel uppstod vid bokningen");
  }

  const data: BookingResponse = await res.json();
  return data;
}
