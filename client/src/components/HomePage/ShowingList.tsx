import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";

import MovieCard from "./MovieCard";
import { getAllMovies } from "../../api/movie.api";
import { getAllShowtimes } from "../../api/showTime.api";

type PropsTypes = {
  statusMovie?: string;
};

export default function ShowingList({ statusMovie = "DANGCHIEU" }: PropsTypes) {
  const dispatch = useAppDispatch();

  const { data: movies } = useAppSelector((state) => state.movies);
  const { data: showtime } = useAppSelector((state) => state.showTimes);
  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  useEffect(() => {
    if (showtime.length === 0) {
      dispatch(getAllShowtimes());
    }
  }, [showtime.length, dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map(
        (m) =>
          m.status === statusMovie && (
            <MovieCard
              key={m.id}
              id={m.id}
              title={m.title}
              image={m.image}
              type={m.type}
              release_date={m.release_date}
            />
          )
      )}
    </div>
  );
}
