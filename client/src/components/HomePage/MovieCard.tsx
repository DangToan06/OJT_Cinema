import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hook/useRedux";

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  type: string;
  release_date: string;
}

export default function MovieCard({
  id,
  title,
  image,
  type,
  release_date,
}: MovieCardProps) {
  const navigate = useNavigate();

  const { data: showtime } = useAppSelector((state) => state.showTimes);

  const handelMovie = (title: string) => {
    const id = showtime.find((s) => s.movie === title)?.id;

    navigate(`/showtimes?id=${id}`);
  };

  return (
    <div
      onClick={() => handelMovie(title)}
      key={id}
      className="text-white flex flex-col gap-3 cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-lg shadow-md bg-[#0f1214]">
        <img
          src={image}
          alt={title}
          className="w-full h-[290px] object-cover transition-transform duration-300 group-hover:scale-105" // Sửa hover để mượt hơn khi hover vào div cha
        />
      </div>

      <div className="text-[#9aa3ad] text-xs flex gap-3">
        <span className="uppercase">{type || "-"}</span>
        <span>{release_date || "-"}</span>
      </div>

      <div>
        <p className="text-sm font-semibold leading-tight group-hover:text-red-500 transition-colors">
          {title}
        </p>
      </div>
    </div>
  );
}
