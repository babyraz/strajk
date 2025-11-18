// Request som skickas till API (oförändrat)
export interface BookingRequest {
    when: string;
    lanes: number;
    people: number;
    shoes: number[];
  }
  
  // Rå svar från API
  export interface ApiResponse {
    success: boolean;
    bookingDetails: BookingDetails;
  }
  
  // Domänmodell som används i app-logiken
  export interface BookingDetails {
    when: string;
    lanes: number;
    people: number;
    shoes: number[];
    price: number;
    id: string;
    active: boolean;
  }
  