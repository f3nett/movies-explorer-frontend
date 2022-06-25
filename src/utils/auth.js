export const BASE_URL = 'https://api.movies.f3nett.nomoreparties.sbs';

function checkResponse(res) {
    //проверка ответа
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject({status: res.status, message: `Ошибка: ${res.status} ${res.statusText}`});
    }
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    }).then((responce) => checkResponse(responce));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((responce) => checkResponse(responce))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        });
};

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: jwt,
        },
    }).then((responce) => checkResponse(responce));
};
