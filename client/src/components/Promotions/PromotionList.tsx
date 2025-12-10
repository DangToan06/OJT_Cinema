import React from "react";
import PromotionCard from "./PromotionCard";

const promos = [
  {
    id: 1,
    title: "abc",
    image:
      "http://apiv2.chieuphimquocgia.com.vn/Content/Images/Master/0019547.jpg",
    content: "abc",
    created_at: "10-01-2024",
    updated_at: "11-01-2024",
  },
  {
    id: 2,
    title: "abc",
    image:
      "http://apiv2.chieuphimquocgia.com.vn/Content/Images/Master/0019547.jpg",
    content: "abc",
    created_at: "10-01-2024",
    updated_at: "11-01-2024",
  },{
    id: 3,
    title: "abc",
    image:
      "http://apiv2.chieuphimquocgia.com.vn/Content/Images/Master/0019547.jpg",
    content: "abc",
    created_at: "10-01-2024",
    updated_at: "11-01-2024",
  },{
    id: 4,
    title: "abc",
    image:
      "http://apiv2.chieuphimquocgia.com.vn/Content/Images/Master/0019547.jpg",
    content: "abc",
    created_at: "10-01-2024",
    updated_at: "11-01-2024",
  },{
    id: 5,
    title: "abc",
    image:
      "http://apiv2.chieuphimquocgia.com.vn/Content/Images/Master/0019547.jpg",
    content: "abc",
    created_at: "10-01-2024",
    updated_at: "11-01-2024",
  },{
    id: 6,
    title: "abc",
    image:
      "http://apiv2.chieuphimquocgia.com.vn/Content/Images/Master/0019547.jpg",
    content: "abc",
    created_at: "10-01-2024",
    updated_at: "11-01-2024",
  },{
    id: 7,
    title: "abc",
    image:
      "http://apiv2.chieuphimquocgia.com.vn/Content/Images/Master/0019547.jpg",
    content: "abc",
    created_at: "10-01-2024",
    updated_at: "11-01-2024",
  },
];

export default function PromtionList() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {promos.map((p) => (
        <PromotionCard
          id={p.id}
          title={p.title}
          image={p.image}
          content={p.content}
          created_at={p.created_at}
          updated_at={p.updated_at}
        />
      ))}
    </div>
  );
}
