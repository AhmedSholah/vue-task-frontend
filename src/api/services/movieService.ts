import type { Movie } from "@/types/movie";
import axiosClient from "../axiosClient";

export const movieService = {
  getMovies: async (page: number, filters?: string) => {
    let url = `/items?_page=${page}&_limit=3`;

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

  getFilteredMoviesCount: async (filters?: string) => {
    let url = "/items";

    if (filters) {
      url += `?${filters}`;
    }

    const response = await axiosClient.get(url);
    return response.data.length;
  },

  getMoviesAverageRating: async () => {
    const response = await axiosClient.get("/items");
    const movies = response.data;

    if (!movies.length) return 0;

    const ratedMovies = movies.filter(
      (movie: any) => movie.rating && movie.rating > 0
    );

    if (ratedMovies.length === 0) return 0;

    const sum = ratedMovies.reduce(
      (acc: number, movie: any) => acc + movie.rating,
      0
    );
    return (sum / ratedMovies.length).toFixed(2);
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

  removeAllRatings: async () => {
    const response = await axiosClient.get("/items");
    const movies = response.data;

    const updatePromises = movies.map((movie: Movie) =>
      axiosClient.put(`/items/${movie.id}`, { ...movie, rating: null })
    );

    await Promise.all(updatePromises);

    return { success: true, updatedCount: movies.length };
  },
};
