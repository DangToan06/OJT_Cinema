
interface PromotionCardProps {
  id: number;
  image: string;
}

export default function PromotionCard({ id, image }: PromotionCardProps) {
  return (
    <div
      key={id}
      className="rounded-lg overflow-hidden bg-[#111316] p-3 shadow-lg hover:shadow-xl transition cursor-pointer"
    >
      <img src={image} className="w-full h-24 rounded-md object-cover transition-transform duration-300 hover:scale-105" />
    </div>
  );
}
