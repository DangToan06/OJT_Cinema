import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import type { DayMultiplier, Price, ScreenType, SeatType, TimeDiscount } from "../../interfaces/price.interface";


// === Pricing State mới (gộp thêm bảng Price) ===
interface PriceState {
  seatTypes: SeatType[];
  screenTypes: ScreenType[];
  dayMultipliers: DayMultiplier[];
  timeDiscounts: TimeDiscount[];
  prices: Price[];               // <-- mới thêm
  loading: boolean;
  error: string | null;
}

// === Async Thunks ===
// Lấy tất cả dữ liệu (giờ có thêm bảng price)
export const fetchAllPricing = createAsyncThunk(
  "pricing/fetchAll",
  async () => {
    const [seatRes, screenRes, dayRes, timeRes, priceRes] = await Promise.all([
      axiosInstance.get("/seat_types"),
      axiosInstance.get("/screen_types"),
      axiosInstance.get("/day_multipliers"),
      axiosInstance.get("/time_discounts"),
      axiosInstance.get("/ticket_prices"),   // <-- thêm
    ]);
    return {
      seatTypes: seatRes.data,
      screenTypes: screenRes.data,
      dayMultipliers: dayRes.data,
      timeDiscounts: timeRes.data,
      prices: priceRes.data,
    };
  }
);

// Các update cũ giữ nguyên
export const updateSeatType = createAsyncThunk(
  "pricing/updateSeatType",
  async (item: SeatType) => {
    const res = await axiosInstance.put(`/seat_types/${item.id}`, item);
    return res.data;
  }
);

export const updateScreenType = createAsyncThunk(
  "pricing/updateScreenType",
  async (item: ScreenType) => {
    const res = await axiosInstance.put(`/screen_types/${item.id}`, item);
    return res.data;
  }
);

export const updateDayMultiplier = createAsyncThunk(
  "pricing/updateDayMultiplier",
  async (item: DayMultiplier) => {
    const res = await axiosInstance.put(`/day_multipliers/${item.id}`, item);
    return res.data;
  }
);

export const updateTimeDiscount = createAsyncThunk(
  "pricing/updateTimeDiscount",
  async (item: TimeDiscount) => {
    const res = await axiosInstance.put(`/time_discounts/${item.id}`, item);
    return res.data;
  }
);

// Thêm thunk cho bảng price
export const getAllPrices = createAsyncThunk(
  "pricing/getAllPrices",
  async () => {
    const res = await axiosInstance.get("ticket_prices");
    return res.data;
  }
);

export const editPrice = createAsyncThunk(
  "pricing/editPrice",
  async (price: Price) => {
    const res = await axiosInstance.put(`/ticket_prices/${price.id}`, price);
    return res.data;
  }
);

// === Slice ===
const priceSlice = createSlice({
  name: "pricing",
  initialState: {
    seatTypes: [],
    screenTypes: [],
    dayMultipliers: [],
    timeDiscounts: [],
    prices: [],
    loading: false,
    error: null,
  } as PriceState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all
    builder
      .addCase(fetchAllPricing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPricing.fulfilled, (state, action) => {
        state.loading = false;
        state.seatTypes = action.payload.seatTypes;
        state.screenTypes = action.payload.screenTypes;
        state.dayMultipliers = action.payload.dayMultipliers;
        state.timeDiscounts = action.payload.timeDiscounts;
        state.prices = action.payload.prices;
      })
      .addCase(fetchAllPricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lỗi tải dữ liệu";
      });

    // Update các bảng cũ
    builder
      .addCase(updateSeatType.fulfilled, (state, action) => {
        const idx = state.seatTypes.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.seatTypes[idx] = action.payload;
      })
      .addCase(updateScreenType.fulfilled, (state, action) => {
        const idx = state.screenTypes.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.screenTypes[idx] = action.payload;
      })
      .addCase(updateDayMultiplier.fulfilled, (state, action) => {
        const idx = state.dayMultipliers.findIndex((d) => d.id === action.payload.id);
        if (idx !== -1) state.dayMultipliers[idx] = action.payload;
      })
      .addCase(updateTimeDiscount.fulfilled, (state, action) => {
        const idx = state.timeDiscounts.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.timeDiscounts[idx] = action.payload;
      });

    // Price actions
    builder
      .addCase(getAllPrices.fulfilled, (state, action) => {
        state.prices = action.payload;
      })
      .addCase(editPrice.fulfilled, (state, action) => {
        const idx = state.prices.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.prices[idx] = action.payload;
        else state.prices.push(action.payload);
      });
  },
});

export default priceSlice.reducer;