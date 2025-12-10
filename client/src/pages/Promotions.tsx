import React from "react";
import PromtionList from "../components/Promotions/PromotionList";

export default function Promotions() {
  return (
    <div className="p-20 bg-black text-white">
      <p className="text-center text-3xl font-bold mb-20">Khuyến mãi</p>
      <div>
        <PromtionList />
      </div>
      <div className="flex justify-end gap-4 font-semibold">
        <button className="border px-3 py-2 rounded-md border-[#1E293B] hover:bg-[#1E293B]">
          Quay lại
        </button>
        <button className="border px-3 py-2 rounded-md border-[#1E293B] hover:bg-[#1E293B]">
          Tiếp theo
        </button>
      </div>
    </div>
  );
}
