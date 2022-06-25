class MainApi {
    constructor({ url }) {
        this._url = url;
    }

    _checkResponse(res) {
        //проверка ответа
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject({status: res.status, message: `Ошибка: ${res.status} ${res.statusText}`});
        }
    }

    getUser() {
        //получение информации о пользователе
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: localStorage.getItem('jwt'),
            },
        }).then(this._checkResponse);
    }

    setUserData(userData) {
        //обновление информации о пользователе
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: localStorage.getItem('jwt'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userData.email, name: userData.name }),
        }).then(this._checkResponse);
    }

    getMovies() {
        //получение сохраненных фильмов пользователя с сервера
        return fetch(`${this._url}/movies`, {
            headers: {
                authorization: localStorage.getItem('jwt'),
            },
        }).then(this._checkResponse);
    }

    postMovie(movie) {
        //сохранение нового фильма в списке пользователя
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('jwt'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movieId: movie.movieId,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                year: movie.year,
                description: movie.description,
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                image: movie.image,
                thumbnail: movie.thumbnail,
                trailerLink: movie.trailerLink,
            }),
        }).then(this._checkResponse);
    }

    deleteMovie(movieId) {
        //удаление фильма из списка пользователя по id фильма
        return fetch(`${this._url}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('jwt'),
            },
        }).then(this._checkResponse);
    }
}

const mainApi = new MainApi({ url: 'https://api.movies.f3nett.nomoreparties.sbs' });

export default mainApi;
