import { useState } from "react";
import { Edit, Save } from "lucide-react";

export function PricingManagement() {
  const [editMode, setEditMode] = useState<string | null>(null);

  const [pricing, setPricing] = useState({
    seatTypes: [
      { id: "standard", name: "Ghế Standard", price: 75000 },
      { id: "vip", name: "Ghế VIP", price: 120000 },
      { id: "sweetbox", name: "Ghế Sweetbox", price: 200000 },
    ],
    screenTypes: [
      { id: "2d", name: "Phòng 2D", surcharge: 0 },
      { id: "3d", name: "Phòng 3D", surcharge: 30000 },
      { id: "imax", name: "Phòng IMAX", surcharge: 60000 },
      { id: "4dx", name: "Phòng 4DX", surcharge: 80000 },
    ],
    dayTypes: [
      { id: "weekday", name: "Ngày thường (T2-T5)", multiplier: 1.0 },
      { id: "weekend", name: "Cuối tuần (T6-CN)", multiplier: 1.2 },
      { id: "holiday", name: "Ngày lễ", multiplier: 1.5 },
    ],
    timeSlots: [
      { id: "morning", name: "Suất sáng (trước 12h)", discount: 20000 },
      { id: "afternoon", name: "Suất chiều (12h-17h)", discount: 0 },
      { id: "evening", name: "Suất tối (17h-22h)", discount: 0 },
      { id: "late", name: "Suất khuya (sau 22h)", discount: 15000 },
    ],
  });

  const calculateExamplePrice = () => {
    const basePrice = 75000; // Standard seat
    const screenSurcharge = 30000; // 3D
    const dayMultiplier = 1.2; // Weekend
    const timeDiscount = 0; // Evening

    return (basePrice + screenSurcharge) * dayMultiplier - timeDiscount;
  };

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
          {/* Giá theo loại ghế */}
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
                  {pricing.seatTypes.map((seat) => (
                    <tr key={seat.id}>
                      <td className="py-4 text-gray-900">{seat.name}</td>
                      <td className="py-4 text-right">
                        {editMode === `seat-${seat.id}` ? (
                          <input
                            type="number"
                            defaultValue={seat.price}
                            className="w-32 px-3 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="text-gray-900">
                            {seat.price.toLocaleString()} ₫
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        {editMode === `seat-${seat.id}` ? (
                          <button
                            onClick={() => setEditMode(null)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditMode(`seat-${seat.id}`)}
                            className="text-blue-600 hover:text-blue-700"
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

          {/* Phụ phí theo loại phòng */}
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
                  {pricing.screenTypes.map((screen) => (
                    <tr key={screen.id}>
                      <td className="py-4 text-gray-900">{screen.name}</td>
                      <td className="py-4 text-right">
                        {editMode === `screen-${screen.id}` ? (
                          <input
                            type="number"
                            defaultValue={screen.surcharge}
                            className="w-32 px-3 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="text-gray-900">
                            {screen.surcharge === 0
                              ? "-"
                              : `+${screen.surcharge.toLocaleString()} ₫`}
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        {editMode === `screen-${screen.id}` ? (
                          <button
                            onClick={() => setEditMode(null)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditMode(`screen-${screen.id}`)}
                            className="text-blue-600 hover:text-blue-700"
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

          {/* Hệ số theo ngày */}
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
                  {pricing.dayTypes.map((day) => (
                    <tr key={day.id}>
                      <td className="py-4 text-gray-900">{day.name}</td>
                      <td className="py-4 text-right">
                        {editMode === `day-${day.id}` ? (
                          <input
                            type="number"
                            step="0.1"
                            defaultValue={day.multiplier}
                            className="w-32 px-3 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="text-gray-900">
                            ×{day.multiplier}
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        {editMode === `day-${day.id}` ? (
                          <button
                            onClick={() => setEditMode(null)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditMode(`day-${day.id}`)}
                            className="text-blue-600 hover:text-blue-700"
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

          {/* Giảm giá theo khung giờ */}
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
                  {pricing.timeSlots.map((slot) => (
                    <tr key={slot.id}>
                      <td className="py-4 text-gray-900">{slot.name}</td>
                      <td className="py-4 text-right">
                        {editMode === `time-${slot.id}` ? (
                          <input
                            type="number"
                            defaultValue={slot.discount}
                            className="w-32 px-3 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        ) : (
                          <span className="text-gray-900">
                            {slot.discount === 0
                              ? "-"
                              : `-${slot.discount.toLocaleString()} ₫`}
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        {editMode === `time-${slot.id}` ? (
                          <button
                            onClick={() => setEditMode(null)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditMode(`time-${slot.id}`)}
                            className="text-blue-600 hover:text-blue-700"
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
                <p className="text-right text-red-600">
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
