// ID chung dùng cho tất cả bảng
export type ID = number | string;

// Vai trò người dùng (admin, user)
export type RoleName = "ADMIN" | "USER";

// Loại phim (2D / 3D)
export type MovieType = "2D" | "3D";

export type SeatType = "standard" | "vip" | "sweetbox" | "disabled";

// Trạng thái booking (đơn vé)
export type BookingStatus = "PENDING" | "COMPLETED" | "CANCELED" | "CHECKED_IN";

// Trạng thái thanh toán
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

// 0 = ngày thường, 1 = cuối tuần hoặc lễ
export type DayType = 0 | 1;
