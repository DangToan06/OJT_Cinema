export interface Booking {
  id: number;
  user_id: number;
  showtime_id: number;
  total_seat: number;
  total_price_movie: number;
  created_at: string;
}

export interface InitialBookingState {
  data: Booking[];
  status: "idle" | "pending" | "success" | "failed";
  error: string | null | undefined;
  booking: Booking | null;
}
