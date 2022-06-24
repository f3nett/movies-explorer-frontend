import { MOVIE_DURATION_FILTER } from '../utils/constants';

function filterMovies(movies, searchText, isShortFilter) {
    let newMovies = [];
    if (searchText === '') {
        newMovies = filterMoviesByDuration(movies, isShortFilter);
    } else {
        newMovies = filterMoviesByDuration(filterMoviesByName(movies, searchText), isShortFilter);
    }
    return newMovies;
}

function filterMoviesByName(movies, searchText) {
    let newMovies = [].slice
        .call(movies)
        .filter((movie) => movie.nameRU.toLowerCase().includes(searchText.toLowerCase()))
        .sort((a, b) => (a.nameRU.trim().toLowerCase().indexOf(searchText) > b.nameRU.trim().toLowerCase().indexOf(searchText) ? 1 : -1));
    return newMovies;
}

function filterMoviesByDuration(movies, isShortFilter) {
    if (isShortFilter) {
        return movies.filter((movie) => movie.duration <= MOVIE_DURATION_FILTER).sort((a, b) => (a.duration > b.duration ? 1 : -1));
    }
    return movies;
}

export { filterMovies };
