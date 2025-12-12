import { useNavigate } from "react-router-dom";

interface NewsCardProps {
  image: string;
  date: string;
  title: string;
}

export function NewsCard({ image, date, title }: NewsCardProps) {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg overflow-hidden bg-[#242837] hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    onClick={() => navigate("/newDetail?1")}>
      <div className="overflow-hidden h-60">
        <img
          alt={title}
          src={image}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-4 space-y-2">
        <p className="text-gray-400 text-sm">{date}</p>
        <h3 className="text-white leading-tight hover:text-red-500 transition-colors duration-200">
          {title}
        </h3>
      </div>
    </div>
  );
}
