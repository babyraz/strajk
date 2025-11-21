// src/api/bookingApi.ts
import type { BookingRequest, ApiResponse } from "../types/booking";

const BASE_URL = "https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com";

let cachedApiKey: string | null = null;

async function getApiKey(): Promise<string> {
  if (cachedApiKey) return cachedApiKey;

  const res = await fetch(`${BASE_URL}/key`);

  if (!res.ok) {
    throw new Error("Kunde inte hämta API-nyckel");
  }

  const data = await res.json();
  console.log("DEBUG KEY RESPONSE:", data);

  const key = data.key || data.data?.key;

  if (!key) {
    throw new Error("API-nyckeln saknas i svaret!");
  }

  cachedApiKey = key;
  return key;
}


export async function createBooking(
  booking: BookingRequest
): Promise<ApiResponse> {
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
    const errorData = await res.text();
    throw new Error(errorData || "Misslyckades med bokningen");
  }

  const json = await res.json();
  console.log("DEBUG BOOKING RESPONSE:", json);

  return json.data || json;
}
