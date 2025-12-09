import { useState } from "react";
import { Armchair } from "lucide-react";

export function SeatsManagement() {
  const [selectedScreen, setSelectedScreen] = useState("1");

  const screens = [
    { id: "1", name: "CGV Vincom - Phòng 1", rows: 10, seatsPerRow: 12 },
    { id: "2", name: "CGV Vincom - Phòng 2", rows: 12, seatsPerRow: 15 },
    { id: "3", name: "Lotte Cinema - Phòng VIP", rows: 6, seatsPerRow: 8 },
  ];

  const seatTypes = [
    {
      id: "standard",
      label: "Standard",
      color: "bg-gray-400",
      price: "75,000",
    },
    { id: "vip", label: "VIP", color: "bg-yellow-500", price: "120,000" },
    {
      id: "sweetbox",
      label: "Sweetbox",
      color: "bg-pink-500",
      price: "200,000",
    },
    { id: "disabled", label: "Ẩn/Hỏng", color: "bg-gray-200", price: "-" },
  ];

  const [seats, setSeats] = useState(() => {
    const initialSeats: any = {};
    screens.forEach((screen) => {
      initialSeats[screen.id] = [];
      for (let row = 0; row < screen.rows; row++) {
        for (let seat = 0; seat < screen.seatsPerRow; seat++) {
          const isVIP = row >= 4 && row <= 6;
          const isSweetbox = row === screen.rows - 1 && seat >= 5 && seat <= 6;
          const isDisabled =
            (row === 2 && seat === 5) || (row === 7 && seat === 9);

          let type = "standard";
          if (isDisabled) type = "disabled";
          else if (isSweetbox) type = "sweetbox";
          else if (isVIP) type = "vip";

          initialSeats[screen.id].push({
            row: String.fromCharCode(65 + row),
            number: seat + 1,
            type,
          });
        }
      }
    });
    return initialSeats;
  });

  const currentScreen = screens.find((s) => s.id === selectedScreen);
  const currentSeats = seats[selectedScreen] || [];

  const toggleSeatType = (row: string, number: number) => {
    setSeats((prev) => ({
      ...prev,
      [selectedScreen]: prev[selectedScreen].map((seat: any) => {
        if (seat.row === row && seat.number === number) {
          const types = ["standard", "vip", "sweetbox", "disabled"];
          const currentIndex = types.indexOf(seat.type);
          const nextIndex = (currentIndex + 1) % types.length;
          return { ...seat, type: types[nextIndex] };
        }
        return seat;
      }),
    }));
  };

  const getSeatColor = (type: string, isHovered: boolean = false) => {
    const typeConfig = seatTypes.find((t) => t.id === type);
    if (!typeConfig) return "bg-gray-400";
    return isHovered ? `${typeConfig.color} opacity-80` : typeConfig.color;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Quản lý ghế ngồi</h1>
        <p className="text-gray-600">
          Thiết lập và quản lý sơ đồ ghế cho từng phòng chiếu
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Chọn phòng chiếu</h3>
            <div className="space-y-2">
              {screens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => setSelectedScreen(screen.id)}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                    selectedScreen === screen.id
                      ? "bg-red-600 text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <p
                    className={
                      selectedScreen === screen.id
                        ? "text-white"
                        : "text-gray-900"
                    }
                  >
                    {screen.name}
                  </p>
                  <p
                    className={`text-sm ${
                      selectedScreen === screen.id
                        ? "text-red-100"
                        : "text-gray-500"
                    }`}
                  >
                    {screen.rows} hàng × {screen.seatsPerRow} ghế
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Loại ghế</h3>
            <div className="space-y-3">
              {seatTypes.map((type) => (
                <div key={type.id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded ${type.color}`} />
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">{type.label}</p>
                    <p className="text-gray-500 text-xs">{type.price} ₫</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Click vào ghế để thay đổi loại
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <div className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center py-3 rounded-lg mb-2">
                MÀN HÌNH
              </div>
              <p className="text-center text-gray-500 text-sm">
                Màn hình chiếu
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              {currentScreen &&
                [...Array(currentScreen.rows)].map((_, rowIndex) => {
                  const rowLetter = String.fromCharCode(65 + rowIndex);
                  return (
                    <div key={rowLetter} className="flex items-center gap-3">
                      <span className="w-8 text-center text-gray-600">
                        {rowLetter}
                      </span>
                      <div className="flex gap-2">
                        {[...Array(currentScreen.seatsPerRow)].map(
                          (_, seatIndex) => {
                            const seatNumber = seatIndex + 1;
                            const seat = currentSeats.find(
                              (s: any) =>
                                s.row === rowLetter && s.number === seatNumber
                            );

                            return (
                              <button
                                key={seatNumber}
                                onClick={() =>
                                  toggleSeatType(rowLetter, seatNumber)
                                }
                                className={`w-8 h-8 rounded-t-lg flex items-center justify-center transition-all hover:scale-110 ${
                                  seat ? getSeatColor(seat.type) : "bg-gray-400"
                                }`}
                                title={`${rowLetter}${seatNumber} - ${
                                  seatTypes.find((t) => t.id === seat?.type)
                                    ?.label || "Standard"
                                }`}
                              >
                                <Armchair className="w-4 h-4 text-white" />
                              </button>
                            );
                          }
                        )}
                      </div>
                      <span className="w-8 text-center text-gray-600">
                        {rowLetter}
                      </span>
                    </div>
                  );
                })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  Tổng số ghế:{" "}
                  <span className="text-gray-900">
                    {currentScreen
                      ? currentScreen.rows * currentScreen.seatsPerRow
                      : 0}
                  </span>
                </div>
                <div className="flex gap-6">
                  <div>
                    Standard:{" "}
                    <span className="text-gray-900">
                      {
                        currentSeats.filter((s: any) => s.type === "standard")
                          .length
                      }
                    </span>
                  </div>
                  <div>
                    VIP:{" "}
                    <span className="text-gray-900">
                      {currentSeats.filter((s: any) => s.type === "vip").length}
                    </span>
                  </div>
                  <div>
                    Sweetbox:{" "}
                    <span className="text-gray-900">
                      {
                        currentSeats.filter((s: any) => s.type === "sweetbox")
                          .length
                      }
                    </span>
                  </div>
                  <div>
                    Ẩn:{" "}
                    <span className="text-gray-900">
                      {
                        currentSeats.filter((s: any) => s.type === "disabled")
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Đặt lại
              </button>
              <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Lưu cấu hình
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
