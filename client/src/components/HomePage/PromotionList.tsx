import PromotionCard from "./PromotionCard";

const promos = [
  {
    id: 1,
    image:
      "http://apiv2.chieuphimquocgia.com.vn/Content/Images/Master/0019547.jpg",
  },
  {
    id: 2,
    image:
      "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0019481.jpg&w=256&q=75",
  },
  {
    id: 3,
    image:
      "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0019012.png&w=256&q=75",
  },
];

export default function PromoList() {
  return (
    <div className="flex flex-col gap-4">
      {promos.map((p) => (
        <PromotionCard key={p.id} image={p.image} id={0} />
      ))}
    </div>
  );
}
