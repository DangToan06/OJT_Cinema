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
  return (
    <div key={id} className="text-white flex flex-col gap-3 cursor-pointer">
      <div className="relative overflow-hidden rounded-lg shadow-md bg-[#0f1214]">
        <img
          src={image}
          alt={title}
          className="w-full h-[290px] object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="text-[#9aa3ad] text-xs flex gap-3">
        <span className="uppercase">{type || "-"}</span>
        <span>{release_date || "-"}</span>
      </div>

      <div>
        <p className="text-sm font-semibold leading-tight">{title}</p>
      </div>
    </div>
  );
}
