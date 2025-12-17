import { useEffect, useState } from "react";
import PromotionsCard from "../Card/PromotionsCard";
import axios from "axios";
import type { News } from "../../types/news.interface";

export default function PromtionList() {
  const [newsData, setNewsData] = useState<News[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/news")
      .then((res) => setNewsData(res.data));
  }, []);
  return (
    <div className="flex flex-col gap-4">
      {newsData
        .filter((n) => n.category == "promotion")
        .map((p) => (
          <PromotionsCard id={p.id} image={p.bannerUrl} />
        ))}
    </div>
  );
}
