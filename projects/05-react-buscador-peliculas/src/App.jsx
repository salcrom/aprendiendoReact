import { useEffect, useState, useRef, useCallback } from "react";
import debounce from 'just-debounce-it';
import { Movies } from './components/Movies';
import { useMovies } from "./hooks/useMovies";
import './App.css'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === "") {
      setError("No se puede buscar una cadena vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película que empiece pon un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return {
    search,
    updateSearch,
    error
  }
}

function App() {
  const [sort, setSort] = useState(false)
  const { error, search, updateSearch } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  // Fix: Create debounced version of getMovies directly
  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // const { query } = Object.fromEntries(new window.FormData(event.target));
    getMovies({ search });
  }

  const handleSort = () => {
    setSort(!sort);
  }

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch)
    debouncedGetMovies(newSearch);
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            value={search}
            onChange={handleChange}
            type="text"
            name="search"
            placeholder="Avengers, Star Wars, The Matrix ..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  );
}

export default App