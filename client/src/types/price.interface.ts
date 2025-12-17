export interface TicketPrice {
  startTime: string | null;
  id: string;
  type_seat: "STANDARD" | "VIP" | "SWEETBOX" | string;
  type_movie: "2D" | "3D" | string;
  price: number;
  day_type: number | string;
  time: number | string;
}

export interface InitialPriceType {
  status: "idle" | "pending" | "success" | "failed";
  data: TicketPrice[];
  error: undefined | null | string;
  ticketPrice: TicketPrice | null;
}
