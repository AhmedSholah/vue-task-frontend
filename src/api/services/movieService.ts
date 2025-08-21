import type { Movie } from "@/types/movie";
import axiosClient from "../axiosClient";

export const movieService = {
  getMovies: async () => {
    const response = await axiosClient.get("/items");
    return response.data;
  },

  createMovie: async (movie: Movie) => {
    const response = await axiosClient.post("/items", movie);
    return response.data;
  },

  updateMovie: async (id: string, movie: Movie) => {
    const response = await axiosClient.put(`/items/${id}`, movie);
    return response.data;
  },

  deleteMovie: async (id: string) => {
    const response = await axiosClient.delete(`/items/${id}`);
    return response.data;
  },
};
