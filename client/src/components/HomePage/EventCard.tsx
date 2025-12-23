import { useNavigate } from "react-router-dom";

interface EventCardProps {
  id: string;
  image: string;
}

export default function EventCard({ id, image }: EventCardProps) {
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/newDetail?${id}`);
  }
  return (
    <div
      key={id}
      className="rounded-lg overflow-hidden bg-[#111316] p-3 shadow-lg hover:shadow-xl transition cursor-pointer"
    >
      <img
        src={image}
        className="w-full h-24 object-cover rounded-md transition-transform duration-300 hover:scale-105"
        onClick={() => handleNavigate(id)}
      />
    </div>
  );
}
