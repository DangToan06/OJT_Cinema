import axios from "axios";
import EventCard from "./EventCard";
import type { News } from "../../types/news.interface";
import { useEffect, useState } from "react";

export default function EventList() {
  const [newsData, setNewsData] = useState<News[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/news")
      .then((res) => setNewsData(res.data));
  }, []);
  const currentItems = newsData
    .filter((n) => n.category == "news")
    
  return (
    <div className="flex flex-col gap-4">
      {currentItems.map((e) => (
        <EventCard key={e.id} image={e.bannerUrl} id={e.id} />
      ))}
    </div>
  );
}
