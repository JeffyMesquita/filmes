//Gerar uma lista de filmes com tamanho que eu quiser.

export function getListMovies(size, movies){
  let popularMovies = [];

  for (let i = 0, l = size; i < l; i++){
    popularMovies.push(movies[i]);
  }
}

//Gerar um número aleatório com base no tamanho da lista de filmes que eu passar
export function randomBanner(movies){
  return Math.floor(Math.random() * movies.length)
}