import axios from "axios";
import { useEffect, useState } from "react";

type Festival = {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
};
const FestivalDetails = () => {
  const [data, setData] = useState<Festival | null>(null);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/festivals/${window.location.href.split("?")[1]}`
      )
      .then((res) => setData(res.data));
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-[#10141b] font-montserrat">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1 w-full px-8 py-12 flex flex-col gap-6 text-white">
        <h2 className="text-2xl font-semibold">{data?.title}</h2>
        <p className="text-gray-400">{data?.description}</p>
        <img
          src={data?.image}
          alt="Festival"
          className="w-full aspect-video object-cover rounded-xl
    shadow-md
    "
        />
      </main>
    </div>
  );
};

export default FestivalDetails;
