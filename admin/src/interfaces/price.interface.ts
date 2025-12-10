export interface Price {
  id: number;
  type_seat: string;
  type_movie: string;
  price: number;
  day_type: number;
  start_time: string;
  end_time: string;
}

export type InitialPriceType = {
  status: "idle" | "pending" | "success" | "failed";
  data: Price[];
  error: null | string | undefined;
  price: Price | null;
};


export interface SeatType {
  id: number;
  name: string;
  base_price: number;
}

export interface ScreenType {
  id: number;
  name: string;
  surcharge: number;
}

export interface DayMultiplier {
  id: number;
  name: string;
  multiplier: number;
}

export interface TimeDiscount {
  id: number;
  name: string;
  discount: number;
}