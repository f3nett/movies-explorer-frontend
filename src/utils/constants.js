import defaultImage from '../images/not-found-image.png';

const SMALL_LIST_SIZE = 5;
const MEDIUM_LIST_SIZE = 8;
const LARGE_LIST_SIZE = 16;
const SMALL_LIST_INC = 2;
const LARGE_LIST_INC = 4;

const DEFAULT_MOVIE = {
    nameRU: 'Не найден',
    nameEN: 'Not found',
    year: '2022',
    description: 'Без описания',
    country: 'Неизвестно',
    director: 'Неизвестно',
    duration: 0,
    image: defaultImage,
    thumbnail: defaultImage,
    trailerLink: 'https://movies.f3nett.nomoreparties.sbs/404',
};

export { SMALL_LIST_SIZE, MEDIUM_LIST_SIZE, LARGE_LIST_SIZE, SMALL_LIST_INC, LARGE_LIST_INC, DEFAULT_MOVIE };
