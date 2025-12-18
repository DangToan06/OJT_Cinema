import type { SeatType } from "./enums";

export interface ITheater {
  name: string;
  address: string;
  phone: string;
  website: string;
  screens: number;
  status: "Đang hoạt động" | "Ngừng hoạt động";
  id: string;
}

export interface IScreen {
  id: string;
  name: string;
  theater: string;
  theaterId: string;
  type: "Mini" | "Standard" | "IMAX" | "Large" | null;
  capacity: number;
  row: number;
  column: number;
  status: "Đang hoạt động" | "Ngừng hoạt động";
}

export interface Seat {
  row: string;
  number: number;
  type: SeatType;
  booked: boolean;
}

export interface SeatsMapEntity {
  screenId: string;
  seats: Seat[];
  id: string;
}
