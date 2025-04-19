const API_KEY = "aaf5e39f";

export const searchMovies = async ({ search }) => {
    if (search === '') return;

    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`)
        const json = await response.json();

        const movies = json.Search;

        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }));
    } catch (e) {
        throw new Error(e, 'Error searching movies');
    }
}
