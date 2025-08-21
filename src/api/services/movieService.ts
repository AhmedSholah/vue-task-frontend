import type { Movie } from "@/types/movie";
import axiosClient from "../axiosClient";

export const movieService = {
  getMovies: async (page: string, filters?: string) => {
    // base query with pagination
    let url = `/items?_page=${page}&_limit=3`;

    // add filters if provided
    if (filters) {
      url += `&${filters}`;
    }

    const response = await axiosClient.get(url);
    return response.data;
  },

  getMoviesCount: async () => {
    const response = await axiosClient.get("/items");
    return response.data.length;
  },

  getMoviesAverageRating: async () => {
    const response = await axiosClient.get("/items");
    const movies = response.data;

    if (!movies.length) return 0;

    const sum = movies.reduce(
      (acc: number, movie: any) => acc + (movie.rating ?? 0),
      0
    );
    return (sum / movies.length).toFixed(2);
  },

  getMovie: async (id: string | undefined) => {
    const response = await axiosClient.get(`/items/${id}`);
    return response.data;
  },

  createMovie: async (movie: Movie) => {
    const response = await axiosClient.post("/items", movie);
    return response.data;
  },

  updateMovie: async (movie: Movie) => {
    const response = await axiosClient.put(`/items/${movie.id}`, movie);
    return response.data;
  },

  deleteMovie: async (id: string) => {
    const response = await axiosClient.delete(`/items/${id}`);
    return response.data;
  },
};
