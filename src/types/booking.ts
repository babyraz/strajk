
export interface BookingRequest {
    when: string;
    lanes: number;
    people: number;
    shoes: number[];
  }
  

  export interface ApiResponse {
    success: boolean;
    bookingDetails: BookingDetails;
  }
  

  export interface BookingDetails {
    when: string;
    lanes: number;
    people: number;
    shoes: number[];
    price: number;
    bookingId: string;
    active: boolean;
  }
  