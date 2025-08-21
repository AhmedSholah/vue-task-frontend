import axios from "axios";

export const movieService = {
  getMovies: async () => {
    const response = await axios.get("http://localhost:8080/items");
    return response.data;
  },
};
