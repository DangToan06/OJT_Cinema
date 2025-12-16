import { useEffect, useState } from "react";
import { Edit, Save, X } from "lucide-react";
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

  const handleCancel = () => {
    setEditing(null);
    setTempValue(0);
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
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-gray-400 animate-pulse font-medium">
          Đang tải cấu hình giá...
        </div>
      </div>
    );
  }

  const renderInput = (isFloat = false) => (
    <div className="flex items-center justify-end gap-2">
      <input
        type="number"
        step={isFloat ? "0.1" : "1"}
        value={tempValue}
        onChange={(e) => setTempValue(+e.target.value)}
        className="w-28 px-3 py-1.5 text-sm border border-blue-500/50 rounded bg-gray-800 text-right text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm placeholder-gray-500"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Escape") handleCancel();
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8 md:p-8">
      <div className="max-w-8xl mx-auto">
        <div className="mb-8">
          <h1 className="text-white mb-2 font-bold text-3xl tracking-tight">
            Quản lý giá vé
          </h1>
          <p className="text-gray-400 text-lg">
            Cấu hình bảng giá vé theo loại ghế, phòng chiếu và thời gian
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800 bg-gray-800/30 flex justify-between items-center">
                <h2 className="text-gray-100 font-semibold text-lg">
                  Giá cơ bản theo ghế
                </h2>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-900/30 text-blue-400 border border-blue-900/50">
                  Cơ sở
                </span>
              </div>
              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-3">Loại ghế</th>
                      <th className="px-6 py-3 text-right">Giá (₫)</th>
                      <th className="px-6 py-3 text-right w-24">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {seatTypes.map((seat: any) => (
                      <tr
                        key={seat.id}
                        className="hover:bg-gray-800/50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 text-gray-200 font-medium">
                          {seat.name}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {editing?.type === "seat" &&
                          editing.id === seat.id ? (
                            renderInput()
                          ) : (
                            <span className="text-gray-300">
                              {seat.base_price.toLocaleString()} ₫
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {editing?.type === "seat" &&
                          editing.id === seat.id ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() =>
                                  handleSave("seat", seat, "base_price")
                                }
                                className="p-1 text-green-400 hover:bg-gray-700 rounded transition-colors"
                              >
                                <Save className="w-5 h-5" />
                              </button>
                              <button
                                onClick={handleCancel}
                                className="p-1 text-red-400 hover:bg-gray-700 rounded transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                handleEdit("seat", seat.id, seat.base_price)
                              }
                              className="p-1 text-gray-500 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800 bg-gray-800/30 flex justify-between items-center">
                <h2 className="text-gray-100 font-semibold text-lg">
                  Phụ phí loại phòng
                </h2>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-emerald-900/30 text-emerald-400 border border-emerald-900/50">
                  Cộng thêm
                </span>
              </div>
              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-3">Loại phòng</th>
                      <th className="px-6 py-3 text-right">Phụ phí (₫)</th>
                      <th className="px-6 py-3 text-right w-24">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {screenTypes.map((screen: any) => (
                      <tr
                        key={screen.id}
                        className="hover:bg-gray-800/50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 text-gray-200 font-medium">
                          {screen.name}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {editing?.type === "screen" &&
                          editing.id === screen.id ? (
                            renderInput()
                          ) : screen.surcharge === 0 ? (
                            <span className="text-gray-600">-</span>
                          ) : (
                            <span className="text-emerald-400 font-medium">
                              +{screen.surcharge.toLocaleString()} ₫
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {editing?.type === "screen" &&
                          editing.id === screen.id ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() =>
                                  handleSave("screen", screen, "surcharge")
                                }
                                className="p-1 text-green-400 hover:bg-gray-700 rounded"
                              >
                                <Save className="w-5 h-5" />
                              </button>
                              <button
                                onClick={handleCancel}
                                className="p-1 text-red-400 hover:bg-gray-700 rounded"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                handleEdit(
                                  "screen",
                                  screen.id,
                                  screen.surcharge
                                )
                              }
                              className="p-1 text-gray-500 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 bg-gray-800/30">
                  <h2 className="text-gray-100 font-semibold text-lg">
                    Hệ số ngày
                  </h2>
                </div>
                <div className="p-0">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-gray-800">
                      {dayMultipliers.map((day: any) => (
                        <tr
                          key={day.id}
                          className="hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-200 text-sm">
                            {day.name}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {editing?.type === "day" &&
                            editing.id === day.id ? (
                              renderInput(true)
                            ) : (
                              <span className="font-semibold text-orange-400 bg-orange-900/20 border border-orange-900/50 px-2 py-1 rounded">
                                ×{day.multiplier}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right w-20">
                            {editing?.type === "day" &&
                            editing.id === day.id ? (
                              <button
                                onClick={() =>
                                  handleSave("day", day, "multiplier")
                                }
                                className="text-green-400 hover:bg-gray-700 p-1 rounded"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleEdit("day", day.id, day.multiplier)
                                }
                                className="text-gray-500 hover:text-blue-400 p-1 rounded"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 bg-gray-800/30">
                  <h2 className="text-gray-100 font-semibold text-lg">
                    Giảm giá giờ
                  </h2>
                </div>
                <div className="p-0">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-gray-800">
                      {timeDiscounts.map((slot: any) => (
                        <tr
                          key={slot.id}
                          className="hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-200 text-sm">
                            {slot.name}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {editing?.type === "time" &&
                            editing.id === slot.id ? (
                              renderInput()
                            ) : slot.discount === 0 ? (
                              <span className="text-gray-600 text-sm">-</span>
                            ) : (
                              <span className="text-rose-400 font-medium text-sm">
                                -{slot.discount.toLocaleString()} ₫
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right w-20">
                            {editing?.type === "time" &&
                            editing.id === slot.id ? (
                              <button
                                onClick={() =>
                                  handleSave("time", slot, "discount")
                                }
                                className="text-green-400 hover:bg-gray-700 p-1 rounded"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleEdit("time", slot.id, slot.discount)
                                }
                                className="text-gray-500 hover:text-blue-400 p-1 rounded"
                              >
                                <Edit className="w-4 h-4" />
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
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 sticky top-8">
              <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-800 to-gray-900">
                <h2 className="text-gray-100 font-bold text-lg">
                  Tính giá ví dụ
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Mô phỏng 1 vé Standard, 3D, Cuối tuần
                </p>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Ghế Standard</span>
                  <span className="text-gray-200 font-medium">75,000 ₫</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Phòng 3D</span>
                  <span className="text-emerald-400 font-medium">
                    +30,000 ₫
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-700 border-dashed">
                  <span className="text-sm text-gray-400">Tạm tính</span>
                  <span className="text-gray-200">105,000 ₫</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    Hệ số ngày (Cuối tuần)
                  </span>
                  <span className="text-orange-400 font-bold bg-orange-900/30 px-2 py-0.5 rounded text-xs border border-orange-900/50">
                    ×1.2
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Suất tối</span>
                  <span className="text-gray-600 italic text-xs">
                    Không giảm
                  </span>
                </div>

                <div className="pt-4 border-t-2 border-gray-800 mt-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-semibold text-gray-400">
                      Tổng cộng
                    </span>
                    <span className="text-2xl text-blue-400 font-bold tracking-tight">
                      {calculateExamplePrice().toLocaleString()} ₫
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-lg text-xs text-gray-500 leading-relaxed border border-gray-800">
                  <span className="font-semibold text-gray-400">
                    Công thức:
                  </span>{" "}
                  <br />
                  (Giá ghế + Phụ phí phòng) × Hệ số ngày - Giảm giá giờ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
