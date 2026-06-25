import { useEffect, useState } from "react";
import MovieModal from "../components/MovieModal";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";
import Register from "../pages/Register";
import { useStore } from "../store/useStore";

const pagePaths = {
  register: "/",
  categories: "/categories",
  dashboard: "/dashboard",
  movies: "/movies",
};

function getPageFromPath() {
  const page = window.location.pathname.replace("/", "");
  return page || "register";
}

function AppRoutes() {
  const { user, selectedCategories, notes, setUser, setCategories, setNotes } = useStore();
  const [page, setPage] = useState(getPageFromPath);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const goTo = (nextPage) => {
    window.history.pushState({}, "", pagePaths[nextPage] || "/");
    setPage(nextPage);
  };

  useEffect(() => {
    const onPopState = () => setPage(getPageFromPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!user && page !== "register") {
      goTo("register");
    }
  }, [page, user]);

  const register = (userData) => {
    setUser(userData);
    goTo("categories");
  };

  return (
    <main>
      {page === "register" && <Register onRegister={register} />}
      {page === "categories" && (
        <Categories selected={selectedCategories} onChange={setCategories} onNext={() => goTo("dashboard")} />
      )}
      {page === "dashboard" && user && (
        <Dashboard
          user={user}
          selected={selectedCategories}
          notes={notes}
          onNotesChange={setNotes}
          onBrowse={() => goTo("movies")}
        />
      )}
      {page === "movies" && user && (
        <Movies
          selected={selectedCategories}
          user={user}
          onHome={() => goTo("dashboard")}
          onMovieSelect={setSelectedMovie}
        />
      )}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </main>
  );
}

export default AppRoutes;
