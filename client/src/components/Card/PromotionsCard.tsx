import { useNavigate } from "react-router-dom";

interface PromotionCardProps {
  id: number;
  image?: string;
  title?: string;
  date?: string;
}

export default function PromotionCard({ id, image, title }: PromotionCardProps) {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg overflow-hidden bg-[#242837] hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    onClick={() => navigate(`/promotionDetail?${id.toString().split("-")[1]}`)}>
      <div className="rounded-lg overflow-hidden bg-[#111316] p-3 shadow-lg hover:shadow-xl transition cursor-pointer">
        <img
          alt={title}
          src={image}
          className="w-full h-24 object-cover rounded-md transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}
