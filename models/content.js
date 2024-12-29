import { data } from "../libs/data.js";

let movies = data
  .filter((item) => item.type === "Movie")
  .map((movie) => ({ ...movie }));

let tvshows = data
  .filter((item) => item.type === "TV Show")
  .map((movie) => ({ ...movie }));

// ===== Movie Functions =====

export async function getMovieContent() {
  return [...movies];
}

export async function getMovieById(movieId) {
  return movies.find(({ show_id }) => show_id === movieId);
}

export async function getMovieByParam(field, value) {
  if (field === "release_year") {
    return movies.find((movie) => movie[field] === value);
  } else {
    return movies.find((movie) => movie[field].includes(value, 0));
  }
}

export async function addReviewToMovie(movieId, review_string) {
  console.log(movieId);
  const selected_movie = movies.find(({ show_id }) => show_id === movieId);
  console.log("Found movie");
  selected_movie["review"] = review_string;
  return selected_movie;
}

export async function deleteMovieReview(movieId) {
  console.log(movieId);
  const selected_movie = movies.find(({ show_id }) => show_id === movieId);
  console.log("Found movie");
  delete selected_movie["review"];
  return selected_movie;
}

export async function createNewMovie(movie_details) {
  const current_movie_total = movies.length;
  const current_tv_total = tvshows.length;
  const new_movie = {
    show_id: "s" + (current_movie_total + current_tv_total + 1),
    ...movie_details,
  };
  console.log(new_movie.show_id);
  console.log(typeof new_movie.show_id);
  movies = [...movies, new_movie];
  return new_movie;
}

export async function removeMovieEntry(movieId) {
  console.log(movieId);
  const updated_movies = movies
    .filter((item) => item.show_id != movieId)
    .map((movie) => ({ ...movie }));
  movies = updated_movies;
  return movies;
}

export async function addWatchAgain(movieId) {
  const selected_movie = movies.find(({ show_id }) => show_id === movieId);

  selected_movie["watch_again"] = true;
  return selected_movie;
}

export async function addViews(movieId) {
  const selected_movie = movies.find(({ show_id }) => show_id === movieId);
  if (selected_movie["view_count"]) {
    let views = selected_movie["view_count"];
    console.log(views);
    selected_movie["view_count"] = ++views;
    return selected_movie;
  }
  selected_movie["view_count"] = 1;
  return selected_movie;
}

// ===== TV Show Functions =====

export async function getTVContent() {
  return [...tvshows];
}

export async function getTVById(movieId) {
  return tvshows.find(({ show_id }) => show_id === movieId);
}

export async function getTVByParam(field, value) {
  if (field === "release_year") {
    return tvshows.find((tvshows) => tvshows[field] === value);
  } else {
    return tvshows.find((tvshows) => tvshows[field].includes(value, 0));
  }
}

export async function addReviewToTV(movieId, review_string) {
  console.log(movieId);
  const selected_movie = tvshows.find(({ show_id }) => show_id === movieId);
  console.log("Found movie");
  selected_movie["review"] = review_string;
  return selected_movie;
}

export async function deleteTVReview(movieId) {
  console.log(movieId);
  const selected_movie = tvshows.find(({ show_id }) => show_id === movieId);
  console.log("Found movie");
  delete selected_movie["review"];
  return selected_movie;
}

export async function createNewTV(movie_details) {
  const current_movie_total = movies.length;
  const current_tv_total = tvshows.length;
  const new_movie = {
    show_id: "s" + (current_movie_total + current_tv_total + 1),
    ...movie_details,
  };
  console.log(new_movie.show_id);
  console.log(typeof new_movie.show_id);
  movies = [...tvshows, new_movie];
  return new_movie;
}

export async function removeTVEntry(movieId) {
  console.log(movieId);
  const updated_tvshows = tvshows
    .filter((item) => item.show_id != movieId)
    .map((movie) => ({ ...movie }));
  tvshows = updated_tvshows;
  return tvshows;
}

export async function addWatchAgainTv(tvId) {
  const selected_tvshow = tvshows.find(({ show_id }) => show_id === tvId);

  selected_tvshow["watch_again"] = true;
  return selected_tvshow;
}

export async function addViewsTv(tvId) {
  const selected_tvshows = tvshows.find(({ show_id }) => show_id === tvId);
  if (selected_tvshows["view_count"]) {
    let views = selected_tvshows["view_count"];
    console.log(views);
    selected_tvshows["view_count"] = ++views;
    return selected_tvshows;
  }
  selected_tvshows["view_count"] = 1;
  return selected_tvshows;
}
