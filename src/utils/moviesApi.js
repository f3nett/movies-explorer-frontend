import { DEFAULT_MOVIE } from '../utils/constants';

class MoviesApi {
    constructor({ url }) {
        this._url = url;
    }

    getMovies() {
        //получение сохраненных фильмов пользователя с сервера
        return fetch(`${this._url}/`)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject({ status: res.status, message: `Ошибка: ${res.status} ${res.statusText}` });
                }
            })
            .then((res) => {
                return res.map((c) => ({
                    movieId: c.id,
                    nameRU: c.nameRU || DEFAULT_MOVIE.nameRU,
                    nameEN: c.nameEN || DEFAULT_MOVIE.nameEN,
                    year: c.year || DEFAULT_MOVIE.year,
                    description: c.description || DEFAULT_MOVIE.description,
                    country: c.country || DEFAULT_MOVIE.country,
                    director: c.director || DEFAULT_MOVIE.director,
                    duration: c.duration || DEFAULT_MOVIE.duration,
                    image: 'https://api.nomoreparties.co/' + c.image.url || DEFAULT_MOVIE.image,
                    thumbnail: 'https://api.nomoreparties.co/' + c.image.formats.thumbnail.url || DEFAULT_MOVIE.thumbnail,
                    trailerLink: c.trailerLink || DEFAULT_MOVIE.trailerLink,
                }));
            })
            ;
    }
}

const movieApi = new MoviesApi({ url: 'https://api.nomoreparties.co/beatfilm-movies' });

export default movieApi;
