import React from "react";
import type { Promotion } from "../../types/promotion.interface";

export default function PromotionCard({
  id,
  created_at,
  image,
  title,
}: Promotion) {
  return (
    <div className=" cursor-pointer border border-[#374151] rounded-md" key={id}>
      <div className="relative overflow-hidden rounded-lg">
        <img
          className="w-full h-[303px] object-cover transition-transform duration-300 hover:scale-105"
          src={image}
          alt={title}
        />
      </div>
      <div className="p-4">
        <p className="text-[#94A3B8]">{created_at}</p>
        <p>{title}</p>
      </div>
    </div>
  );
}
