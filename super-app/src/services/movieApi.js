const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w780";

const categoryImages = {
  Action: "https://image.tmdb.org/t/p/w780/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
  Drama: "https://image.tmdb.org/t/p/w780/wPU78OPN4BYEgWYdXyg0phMee64.jpg",
  Romance: "https://image.tmdb.org/t/p/w780/6VmFqApQRyZZzmiGOQq2C92jyvH.jpg",
  Thriller: "https://image.tmdb.org/t/p/w780/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
  Western: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=700&q=80",
  Horror: "https://image.tmdb.org/t/p/w780/6fKEw0I2FTD5FLOQ5q7L1tqf876.jpg",
  Fantasy: "https://image.tmdb.org/t/p/w780/5rrGVmRUuCKVbqUu41XIWTXJmNA.jpg",
  Music: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80",
  Fiction: "https://image.tmdb.org/t/p/w780/8rpDcsfLJypbO6vREc0547VKqEv.jpg",
};

const fallbackMovies = {
  Action: [
    ["John Wick: Chapter 4", "2023", "7.7", "169 min", "Keanu Reeves, Donnie Yen, Bill Skarsgard", "John Wick uncovers a path to defeating the High Table, but first he must face a new enemy with powerful alliances.", "https://image.tmdb.org/t/p/w780/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg"],
    ["Mad Max: Fury Road", "2015", "8.1", "121 min", "Tom Hardy, Charlize Theron", "In a ruined desert world, two rebels might be able to restore order while escaping a tyrant's army.", "https://image.tmdb.org/t/p/w780/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg"],
    ["The Dark Knight", "2008", "9.0", "152 min", "Christian Bale, Heath Ledger", "Batman faces a criminal mastermind whose chaos pushes Gotham and its hero to the brink.", "https://image.tmdb.org/t/p/w780/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg"],
    ["Gladiator", "2000", "8.5", "155 min", "Russell Crowe, Joaquin Phoenix", "A betrayed Roman general fights through the arena to avenge his family and emperor.", "https://image.tmdb.org/t/p/w780/ehGpN04mLJIrSnxcZBMvHeG0eDc.jpg"],
  ],
  Drama: [
    ["The Shawshank Redemption", "1994", "9.3", "142 min", "Tim Robbins, Morgan Freeman", "Two imprisoned men bond over decades, finding hope and dignity behind prison walls.", "https://image.tmdb.org/t/p/w780/wPU78OPN4BYEgWYdXyg0phMee64.jpg"],
    ["Forrest Gump", "1994", "8.8", "142 min", "Tom Hanks, Robin Wright", "A kind-hearted man becomes part of defining American moments while holding onto love.", "https://image.tmdb.org/t/p/w780/qdIMHd4sEfJSckfVJfKQvisL02a.jpg"],
    ["The Social Network", "2010", "7.8", "121 min", "Jesse Eisenberg, Andrew Garfield", "The rise of Facebook becomes a story of ambition, rivalry, and fractured friendship.", "https://image.tmdb.org/t/p/w780/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg"],
    ["A Beautiful Mind", "2001", "8.2", "135 min", "Russell Crowe, Jennifer Connelly", "A brilliant mathematician struggles with fame, love, and the mind that made him exceptional.", "https://image.tmdb.org/t/p/w780/rEIg5yJdNOt9fmX4P8gU9LeNoTQ.jpg"],
  ],
  Romance: [
    ["The Fault in Our Stars", "2014", "7.7", "126 min", "Shailene Woodley, Ansel Elgort", "Two teenagers meet in a cancer support group and build a tender, life-changing romance.", "https://image.tmdb.org/t/p/w780/6VmFqApQRyZZzmiGOQq2C92jyvH.jpg"],
    ["La La Land", "2016", "8.0", "128 min", "Ryan Gosling, Emma Stone", "A jazz musician and an aspiring actor chase love and dreams in Los Angeles.", "https://image.tmdb.org/t/p/w780/nxZEdYcHMuD8SSuwusDnK9CD2H1.jpg"],
    ["Titanic", "1997", "7.9", "194 min", "Leonardo DiCaprio, Kate Winslet", "A young aristocrat and artist fall in love aboard the doomed ocean liner.", "https://image.tmdb.org/t/p/w780/sCzcYW9h55WcesOqA12cgEr9Exw.jpg"],
    ["Pride and Prejudice", "2005", "7.8", "129 min", "Keira Knightley, Matthew Macfadyen", "Elizabeth Bennet meets Mr. Darcy in a battle of wit, class, and first impressions.", "https://image.tmdb.org/t/p/w780/zi3D8hOxtxWAP9zLajRxuZ0fyGB.jpg"],
  ],
  Thriller: [
    ["Pulp Fiction", "1994", "8.9", "154 min", "John Travolta, Uma Thurman, Samuel L. Jackson", "Interlocking crime stories collide with wit, violence, and unforgettable style.", "https://image.tmdb.org/t/p/w780/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg"],
    ["Inception", "2010", "8.8", "148 min", "Leonardo DiCaprio, Joseph Gordon-Levitt", "A thief who steals secrets through dreams attempts one final impossible job.", "https://image.tmdb.org/t/p/w780/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg"],
    ["Gone Girl", "2014", "8.1", "149 min", "Ben Affleck, Rosamund Pike", "A missing woman turns a marriage into a national obsession and a psychological maze.", "https://image.tmdb.org/t/p/w780/ts996lKsxvjkO2yiYG0ht4qAicO.jpg"],
    ["Se7en", "1995", "8.6", "127 min", "Brad Pitt, Morgan Freeman", "Two detectives hunt a killer whose crimes follow the seven deadly sins.", "https://image.tmdb.org/t/p/w780/iwgl8zlrrfvfWp9k9Paj8lvFEvS.jpg"],
  ],
  Western: [
    ["Django Unchained", "2012", "8.5", "165 min", "Jamie Foxx, Christoph Waltz", "A freed slave joins a bounty hunter to rescue his wife from a plantation owner.", categoryImages.Western],
    ["The Hateful Eight", "2015", "7.8", "188 min", "Samuel L. Jackson, Kurt Russell", "Strangers trapped by a blizzard discover betrayal and violence in a remote lodge.", "https://image.tmdb.org/t/p/w780/jIywvdPjia2t3eKYbjVTcwBQlG8.jpg"],
    ["True Grit", "2010", "7.6", "110 min", "Jeff Bridges, Hailee Steinfeld", "A determined girl hires a grizzled marshal to track her father's killer.", "https://image.tmdb.org/t/p/w780/5Lbm0gpFDRAPIV1Cth6ln9iL1ou.jpg"],
    ["The Revenant", "2015", "8.0", "157 min", "Leonardo DiCaprio, Tom Hardy", "A frontiersman fights through brutal wilderness after being left for dead.", "https://image.tmdb.org/t/p/w780/ji3ecJphATlVgWNY0B0RVXZizdf.jpg"],
  ],
  Horror: [
    ["Annabelle: Creation", "2017", "6.5", "109 min", "Stephanie Sigman, Talitha Bateman", "A dollmaker and his wife welcome girls into a home haunted by a sinister creation.", "https://image.tmdb.org/t/p/w780/6fKEw0I2FTD5FLOQ5q7L1tqf876.jpg"],
    ["The Conjuring", "2013", "7.5", "112 min", "Vera Farmiga, Patrick Wilson", "Paranormal investigators help a family terrorized by a dark presence.", "https://image.tmdb.org/t/p/w780/9iQWsXwjOMGDvTDdvCnpiyR0UG3.jpg"],
    ["Get Out", "2017", "7.8", "104 min", "Daniel Kaluuya, Allison Williams", "A weekend visit turns into a horrifying revelation about race, power, and control.", "https://image.tmdb.org/t/p/w780/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg"],
    ["It", "2017", "7.2", "135 min", "Jaeden Martell, Bill Skarsgard", "Children in a small town face an ancient evil that feeds on fear.", "https://image.tmdb.org/t/p/w780/8moTOzunF7p40oR5XhlDvJckOSW.jpg"],
  ],
  Fantasy: [
    ["Harry Potter and the Philosopher's Stone", "2001", "7.9", "152 min", "Daniel Radcliffe, Emma Watson", "A young wizard discovers a hidden magical world and his place in it.", "https://image.tmdb.org/t/p/w780/5rrGVmRUuCKVbqUu41XIWTXJmNA.jpg"],
    ["The Lord of the Rings", "2001", "8.8", "178 min", "Elijah Wood, Ian McKellen", "A fellowship forms to destroy a powerful ring before darkness consumes Middle-earth.", "https://image.tmdb.org/t/p/w780/x2RS3uTcsJJ9IfjNPcgDmukoEcQ.jpg"],
    ["Pan's Labyrinth", "2006", "8.2", "118 min", "Ivana Baquero, Sergi Lopez", "A girl discovers a strange fantasy realm amid the brutality of war.", "https://image.tmdb.org/t/p/w780/s8C4whhKtDaJvMDcyiMvx3BIF5F.jpg"],
    ["The Chronicles of Narnia", "2005", "6.9", "143 min", "Georgie Henley, Skandar Keynes", "Four siblings enter a magical kingdom trapped under a witch's winter.", "https://image.tmdb.org/t/p/w780/tuDhEdza074bA497bO9WFEPs6O6.jpg"],
  ],
  Music: [
    ["Whiplash", "2014", "8.5", "107 min", "Miles Teller, J.K. Simmons", "An ambitious drummer is pushed to his limits by a ruthless music instructor.", categoryImages.Music],
    ["Bohemian Rhapsody", "2018", "7.9", "135 min", "Rami Malek, Lucy Boynton", "The story of Freddie Mercury and Queen's rise to legendary status.", "https://image.tmdb.org/t/p/w780/p4P2lr9jh6qzCAcQYxOOxmspKrv.jpg"],
    ["A Star Is Born", "2018", "7.6", "136 min", "Lady Gaga, Bradley Cooper", "A musician helps a singer find fame as his own career and health decline.", "https://image.tmdb.org/t/p/w780/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg"],
    ["Soul", "2020", "8.0", "100 min", "Jamie Foxx, Tina Fey", "A jazz pianist learns what makes life meaningful after an unexpected journey.", "https://image.tmdb.org/t/p/w780/kf456ZqeC45XTvo6W9pW5clYKfQ.jpg"],
  ],
  Fiction: [
    ["Avatar", "2009", "7.6", "162 min", "Sam Worthington, Zoe Saldana", "A marine on an alien moon becomes torn between duty and a new world.", "https://image.tmdb.org/t/p/w780/8rpDcsfLJypbO6vREc0547VKqEv.jpg"],
    ["Interstellar", "2014", "8.7", "169 min", "Matthew McConaughey, Anne Hathaway", "Explorers travel through a wormhole to find humanity a future home.", "https://image.tmdb.org/t/p/w780/xJHokMbljvjADYdit5fK5VQsXEG.jpg"],
    ["Dune", "2021", "8.0", "155 min", "Timothee Chalamet, Rebecca Ferguson", "A noble family enters a deadly struggle for control of a desert planet.", "https://image.tmdb.org/t/p/w780/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg"],
    ["Blade Runner 2049", "2017", "8.0", "164 min", "Ryan Gosling, Harrison Ford", "A young blade runner uncovers a secret that could alter society forever.", "https://image.tmdb.org/t/p/w780/sAtoMqDVhNDQBc3QJL3RF6hlhGq.jpg"],
  ],
};

export const categories = [
  { name: "Action", color: "#ff4d12", genreId: 28, image: categoryImages.Action },
  { name: "Drama", color: "#c996f0", genreId: 18, image: categoryImages.Drama },
  { name: "Romance", color: "#0a8708", genreId: 10749, image: categoryImages.Romance },
  { name: "Thriller", color: "#7bbdf2", genreId: 53, image: categoryImages.Thriller },
  { name: "Western", color: "#9e2406", genreId: 37, image: categoryImages.Western },
  { name: "Horror", color: "#6d50f6", genreId: 27, image: categoryImages.Horror },
  { name: "Fantasy", color: "#ef3bd0", genreId: 14, image: categoryImages.Fantasy },
  { name: "Music", color: "#ec1e35", genreId: 10402, image: categoryImages.Music },
  { name: "Fiction", color: "#69c95d", genreId: 878, image: categoryImages.Fiction },
];

export function getMoviesByCategory(categoryName) {
  return fallbackMovies[categoryName] || fallbackMovies.Action;
}

function assertMovieKey() {
  if (!TMDB_API_KEY) {
    throw new Error("Add VITE_TMDB_API_KEY in .env to load movies.");
  }
}

function poster(path) {
  return path ? `${TMDB_IMAGE_URL}${path}` : "";
}

function normalizeMovie(movie) {
  return {
    id: movie.id,
    title: movie.title || movie.name || "Untitled",
    year: (movie.release_date || movie.first_air_date || "").slice(0, 4),
    rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
    plot: movie.overview || "No description available.",
    poster: poster(movie.backdrop_path || movie.poster_path),
    cover: poster(movie.poster_path || movie.backdrop_path),
  };
}

export async function fetchMoviesByCategory(categoryName, page = 1) {
  assertMovieKey();
  const category = categories.find((item) => item.name === categoryName) || categories[0];
  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    include_adult: "false",
    language: "en-US",
    page: String(page),
    sort_by: "popularity.desc",
    with_genres: String(category.genreId),
  });

  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || "Unable to fetch movies.");
  }

  return (data.results || [])
    .filter((movie) => movie.backdrop_path || movie.poster_path)
    .slice(0, 4)
    .map(normalizeMovie);
}

export async function fetchCategoryCards() {
  const cards = await Promise.all(
    categories.map(async (category) => {
      const movies = await fetchMoviesByCategory(category.name);
      return {
        ...category,
        image: movies[0]?.poster || movies[0]?.cover || "",
      };
    }),
  );

  return cards;
}

export async function fetchMovieDetails(movieId) {
  assertMovieKey();
  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    append_to_response: "credits",
    language: "en-US",
  });

  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || "Unable to fetch movie details.");
  }

  return {
    id: data.id,
    title: data.title,
    year: (data.release_date || "").slice(0, 4),
    rating: data.vote_average ? data.vote_average.toFixed(1) : "N/A",
    runtime: data.runtime ? `${data.runtime} min` : "N/A",
    genre: (data.genres || []).map((genre) => genre.name).join(", "),
    plot: data.overview || "No description available.",
    cast: (data.credits?.cast || []).slice(0, 5).map((person) => person.name).join(", "),
    poster: poster(data.poster_path || data.backdrop_path),
  };
}
