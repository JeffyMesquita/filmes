import axios from "axios";

//URL FILMES EM CARTAZ
//https://api.themoviedb.org/3/

//movie/now_playing?api_key=bc904f1a0165647bd1f5960411c9a914&language=pt-BR&page=1

export const key = "bc904f1a0165647bd1f5960411c9a914";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;
