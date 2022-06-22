function filterMovies(movies, searchText, isShortFilter) {
    let newMovies = filterMoviesByName(movies, searchText);
    if (isShortFilter) {
        return filterMoviesByDuration(newMovies, isShortFilter);
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
    let newMovies = [].slice
        .call(movies)
        .filter((movie) => movie.duration <= 40)
        .sort((a, b) => (a.duration > b.duration ? 1 : -1));
    return newMovies;
}

export { filterMovies, filterMoviesByDuration };
