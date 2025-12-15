import { useEffect, useState } from "react";
import { Edit, Save } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import {
  fetchAllPricing,
  updateDayMultiplier,
  updateScreenType,
  updateSeatType,
  updateTimeDiscount,
} from "../redux/slice/price.slice";

export function PricingManagement() {
  const dispatch = useAppDispatch();
  const { seatTypes, screenTypes, dayMultipliers, timeDiscounts, loading } =
    useAppSelector((state) => state.price);

  const [editing, setEditing] = useState<{ type: string; id: number } | null>(
    null
  );
  const [tempValue, setTempValue] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchAllPricing());
  }, [dispatch]);

  const handleEdit = (type: string, id: number, value: number) => {
    setEditing({ type, id });
    setTempValue(value);
  };

  const handleSave = async (type: string, item: any, field: string) => {
    const updated = { ...item, [field]: tempValue };
    switch (type) {
      case "seat":
        await dispatch(updateSeatType(updated));
        break;
      case "screen":
        await dispatch(updateScreenType(updated));
        break;
      case "day":
        await dispatch(updateDayMultiplier(updated));
        break;
      case "time":
        await dispatch(updateTimeDiscount(updated));
        break;
    }
    setEditing(null);
  };

  const calculateExamplePrice = () => {
    const basePrice = 75000;
    const screenSurcharge = 30000;
    const dayMultiplier = 1.2;
    const timeDiscount = 0;
    return (basePrice + screenSurcharge) * dayMultiplier - timeDiscount;
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Đang tải cấu hình giá...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2 font-bold text-2xl">
          Quản lý giá vé
        </h1>
        <p className="text-gray-600">
          Cấu hình bảng giá vé theo loại ghế, phòng chiếu và thời gian
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          {/* === GIÁ THEO LOẠI GHẾ === */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Giá theo loại ghế</h2>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-gray-600">Loại ghế</th>
                    <th className="pb-3 text-right text-gray-600">Giá (₫)</th>
                    <th className="pb-3 text-right text-gray-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {seatTypes.map((seat: any) => (
                    <tr key={seat.id}>
                      <td className="py-4 text-gray-900">{seat.name}</td>
                      <td className="py-4 text-right">
                        {editing?.type === "seat" && editing.id === seat.id ? (
                          <input
                            type="number"
                            value={tempValue}
                            onChange={(e) => setTempValue(+e.target.value)}
                            className="w-32 px-3 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-red-500"
                            autoFocus
                          />
                        ) : (
                          <span>{seat.base_price.toLocaleString()} ₫</span>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        {editing?.type === "seat" && editing.id === seat.id ? (
                          <button
                            onClick={() =>
                              handleSave("seat", seat, "base_price")
                            }
                            className="text-green-600"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleEdit("seat", seat.id, seat.base_price)
                            }
                            className="text-blue-600"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* === PHỤ PHÍ THEO LOẠI PHÒNG === */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Phụ phí theo loại phòng</h2>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-gray-600">Loại phòng</th>
                    <th className="pb-3 text-right text-gray-600">
                      Phụ phí (₫)
                    </th>
                    <th className="pb-3 text-right text-gray-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {screenTypes.map((screen: any) => (
                    <tr key={screen.id}>
                      <td className="py-4 text-gray-900">{screen.name}</td>
                      <td className="py-4 text-right">
                        {editing?.type === "screen" &&
                        editing.id === screen.id ? (
                          <input
                            type="number"
                            value={tempValue}
                            onChange={(e) => setTempValue(+e.target.value)}
                            className="w-32 px-3 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-red-500"
                            autoFocus
                          />
                        ) : screen.surcharge === 0 ? (
                          "-"
                        ) : (
                          `+${screen.surcharge.toLocaleString()} ₫`
                        )}
                      </td>
                      <td className="py-4 text-right">
                        {editing?.type === "screen" &&
                        editing.id === screen.id ? (
                          <button
                            onClick={() =>
                              handleSave("screen", screen, "surcharge")
                            }
                            className="text-green-600"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleEdit("screen", screen.id, screen.surcharge)
                            }
                            className="text-blue-600"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* === HỆ SỐ THEO NGÀY === */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Hệ số giá theo ngày</h2>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-gray-600">Loại ngày</th>
                    <th className="pb-3 text-right text-gray-600">Hệ số</th>
                    <th className="pb-3 text-right text-gray-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dayMultipliers.map((day: any) => (
                    <tr key={day.id}>
                      <td className="py-4 text-gray-900">{day.name}</td>
                      <td className="py-4 text-right">
                        {editing?.type === "day" && editing.id === day.id ? (
                          <input
                            type="number"
                            step="0.1"
                            value={tempValue}
                            onChange={(e) => setTempValue(+e.target.value)}
                            className="w-24 px-3 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-red-500"
                            autoFocus
                          />
                        ) : (
                          `×${day.multiplier}`
                        )}
                      </td>
                      <td className="py-4 text-right">
                        {editing?.type === "day" && editing.id === day.id ? (
                          <button
                            onClick={() => handleSave("day", day, "multiplier")}
                            className="text-green-600"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleEdit("day", day.id, day.multiplier)
                            }
                            className="text-blue-600"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* === GIẢM GIÁ THEO KHUNG GIỜ === */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Giảm giá theo khung giờ</h2>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-gray-600">Khung giờ</th>
                    <th className="pb-3 text-right text-gray-600">
                      Giảm giá (₫)
                    </th>
                    <th className="pb-3 text-right text-gray-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {timeDiscounts.map((slot: any) => (
                    <tr key={slot.id}>
                      <td className="py-4 text-gray-900">{slot.name}</td>
                      <td className="py-4 text-right">
                        {editing?.type === "time" && editing.id === slot.id ? (
                          <input
                            type="number"
                            value={tempValue}
                            onChange={(e) => setTempValue(+e.target.value)}
                            className="w-32 px-3 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-red-500"
                            autoFocus
                          />
                        ) : slot.discount === 0 ? (
                          "-"
                        ) : (
                          `-${slot.discount.toLocaleString()} ₫`
                        )}
                      </td>
                      <td className="py-4 text-right">
                        {editing?.type === "time" && editing.id === slot.id ? (
                          <button
                            onClick={() => handleSave("time", slot, "discount")}
                            className="text-green-600"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleEdit("time", slot.id, slot.discount)
                            }
                            className="text-blue-600"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* === PANEL VÍ DỤ GIỮ NGUYÊN === */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Tính giá ví dụ</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Loại ghế</p>
                <p className="text-gray-900">Ghế Standard</p>
                <p className="text-right text-gray-900">75,000 ₫</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Loại phòng</p>
                <p className="text-gray-900">Phòng 3D</p>
                <p className="text-right text-green-600">+30,000 ₫</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Tạm tính</p>
                <p className="text-right text-gray-900">105,000 ₫</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Loại ngày</p>
                <p className="text-gray-900">Cuối tuần</p>
                <p className="text-right text-orange-600">×1.2</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Khung giờ</p>
                <p className="text-gray-900">Suất tối</p>
                <p className="text-right text-gray-600">Không giảm</p>
              </div>
              <div className="pt-4 border-t-2 border-gray-300">
                <p className="text-sm text-gray-600 mb-1">Giá cuối cùng</p>
                <p className="text-right text-red-600 font-bold">
                  {calculateExamplePrice().toLocaleString()} ₫
                </p>
              </div>
              <div className="pt-4">
                <p className="text-xs text-gray-500">
                  Công thức: (Giá ghế + Phụ phí phòng) × Hệ số ngày - Giảm giá
                  giờ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
