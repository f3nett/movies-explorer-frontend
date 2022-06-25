import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AuthRoute from '../AuthRoute/AuthRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Navigation from '../Navigation/Navigation';
import NotFound from '../NotFound/NotFound';
import HeaderLayout from '../HeaderLayout/HeaderLayout';
import FooterLayout from '../FooterLayout/FooterLayout';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import mainApi from '../../utils/mainApi';
import moviesApi from '../../utils/moviesApi';
import { filterMovies } from '../../utils/filterMovies';
import { NOT_FOUND_FILM_TOOLTIP_TEXT, UPDATE_USER_TOOLTIP_TEXT } from '../../utils/constants';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [allCards, setAllCards] = React.useState([]);
    const [cards, setCards] = React.useState([]);
    const [allSavedCards, setAllSavedCards] = React.useState([]);
    const [savedCards, setSavedCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({ _id: null, email: '', name: '' });
    const [registrationError, setRegistrationError] = React.useState('');
    const [loginError, setLoginError] = React.useState('');
    const [userUpdateError, setUserUpdateError] = React.useState('');
    const [isNavigationMenuOpen, setIsNavigationMenuOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [tooltipInfoText, setTooltipInfoText] = React.useState('');
    const [isPreloader, setIsPreloader] = React.useState(false);
    const [isMoviesNotFound, setIsMoviesNotFound] = React.useState(false);
    const [isSavedMoviesNotFound, setIsSavedMoviesNotFound] = React.useState(false);
    const [isFilterError, setIsFilterError] = React.useState(false);
    const [movieSearchText, setMovieSearchText] = React.useState('');
    const [savedMovieSearchText, setSavedMovieSearchText] = React.useState('');
    const [isMovieSearchSlider, setIsMovieSearchSlider] = React.useState(false);
    const [isSavedMovieSearchSlider, setIsSavedMovieSearchSlider] = React.useState(false);

    let navigate = useNavigate();

    React.useEffect(() => {
        tokenCheck();
        setCards(JSON.parse(localStorage.getItem('movies')) || []);
        setSavedCards(JSON.parse(localStorage.getItem('savedMovies')) || []);
        setMovieSearchText(localStorage.getItem('movieSearchText') || '');
        setSavedMovieSearchText(localStorage.getItem('savedMovieSearchText') || '');
        setIsMovieSearchSlider(localStorage.getItem('isMovieSearchSlider') === 'true' ? true : false);
        setIsSavedMovieSearchSlider(localStorage.getItem('isSavedMovieSearchSlider') === 'true' ? true : false);
    }, []);

    React.useEffect(() => {
        tokenCheck();
        if (loggedIn) {
            Promise.all([mainApi.getUser(), moviesApi.getMovies(), mainApi.getMovies()])
                .then(([userData, moviesData, savedMoviesData]) => {
                    setIsFilterError(false);
                    setCurrentUser(userData);
                    setAllCards(moviesData || []);
                    setAllSavedCards(savedMoviesData || []);
                    setSavedCards(JSON.parse(localStorage.getItem('savedMovies')) || savedMoviesData || []);
                })
                .catch((err) => {
                    console.log(err);
                    setIsFilterError(true);
                });
        }
    }, [loggedIn]);

    // авторизация
    function tokenCheck() {
        let jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                    }
                })
                .catch((err) => {
                    setLoggedIn(false);
                    localStorage.removeItem('jwt');
                })
                .finally(() => setIsLoading(false));
        } else setIsLoading(false);
    }

    function handleRegister(name, email, password) {
        auth.register(name, email, password)
            .then((res) => {
                setCurrentUser({ name: '', email: '', password: '' });
                setRegistrationError('');
                handleLogin(email, password);
            })
            .catch((err) => {
                console.log(err.message);
                if (err.status === 409) {
                    setRegistrationError('Пользователь с таким email уже существует');
                } else setRegistrationError('При регистрации пользователя произошла ошибка');
            });
    }

    function handleLogin(email, password) {
        auth.login(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setLoginError('');
                    setLoggedIn(true);
                    tokenCheck();
                    navigate('/movies');
                }
            })
            .catch((err) => {
                console.log(err.message);
                if (err.status === 401) {
                    setLoginError('Вы ввели неправильный логин или пароль');
                } else setLoginError('При авторизации произошла ошибка');
            });
    }

    function signOut() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('movieSearchText');
        localStorage.removeItem('savedMovieSearchText');
        localStorage.removeItem('isMovieSearchSlider');
        localStorage.removeItem('isSavedMovieSearchSlider');
        setLoggedIn(false);
        setCurrentUser({ _id: '', email: '', name: '' });
        setCards([]);
        setSavedCards([]);
        setMovieSearchText('');
        setSavedMovieSearchText('');
        setIsMovieSearchSlider(false);
        setIsSavedMovieSearchSlider(false);
        navigate('/');
    }

    // работа с данными пользователя
    function handleUpdateUser(userData) {
        mainApi
            .setUserData(userData)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                setUserUpdateError('');
                console.log('Информация о пользователе обновлена:', { email: newUserData.email, name: newUserData.name });
                handleOpenProfileTooltipClick();
            })
            .catch((err) => {
                console.log(currentUser);
                console.log(err.message);
                if (err.status === 409) {
                    setUserUpdateError('Пользователь с таким email уже существует.');
                } else setUserUpdateError('При обновлении профиля произошла ошибка');
            });
    }

    // работа с фильмами
    function handleCardFind(searchText, isShortMovie) {
        setIsPreloader(true);
        let newCardList = filterMovies(allCards, searchText, isShortMovie);
        setCards(newCardList);
        setMovieSearchText(searchText);
        setIsMovieSearchSlider(isShortMovie);
        localStorage.setItem('movies', JSON.stringify(newCardList));
        localStorage.setItem('movieSearchText', searchText);
        localStorage.setItem('isMovieSearchSlider', isShortMovie);
        newCardList.length === 0 ? setIsMoviesNotFound(true) : setIsMoviesNotFound(false);
        setIsPreloader(false);
    }

    function handleSavedCardFind(searchText, isShortMovie) {
        setIsPreloader(true);
        let newCardList = filterMovies(allSavedCards, searchText, isShortMovie);
        setSavedCards(newCardList);
        setSavedMovieSearchText(searchText);
        setIsSavedMovieSearchSlider(isShortMovie);
        localStorage.setItem('savedMovies', JSON.stringify(newCardList));
        localStorage.setItem('savedMovieSearchText', searchText);
        localStorage.setItem('isSavedMovieSearchSlider', isShortMovie);
        newCardList.length === 0 ? setIsSavedMoviesNotFound(true) : setIsSavedMoviesNotFound(false);
        setIsPreloader(false);
    }

    function handleCardSave(savedCard) {
        mainApi
            .postMovie(savedCard)
            .then((card) => {
                setAllSavedCards([card, ...allSavedCards]);
                setSavedCards([card, ...savedCards]);
                console.log('Фильм добавлен в сохраненные:', card);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(deletedCard) {
        mainApi
            .deleteMovie(deletedCard._id)
            .then((serverMessage) => {
                setAllSavedCards(allSavedCards.filter((c) => c._id !== deletedCard._id));
                setSavedCards(savedCards.filter((c) => c._id !== deletedCard._id));
                console.log(serverMessage);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // навигация по сайту
    function handleOpenNavigationClick() {
        setIsNavigationMenuOpen(true);
    }

    function closeNavigation() {
        setIsNavigationMenuOpen(false);
    }

    function handleOpenMovieTooltipClick() {
        setTooltipInfoText(NOT_FOUND_FILM_TOOLTIP_TEXT);
        setIsInfoTooltipOpen(true);
    }

    function handleOpenProfileTooltipClick() {
        setTooltipInfoText(UPDATE_USER_TOOLTIP_TEXT);
        setIsInfoTooltipOpen(true);
    }

    function closeInfoTooltip() {
        setIsInfoTooltipOpen(false);
        setTooltipInfoText('');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <div className='page__content'>
                    <Routes>
                        <Route element={<AuthRoute loggedIn={loggedIn} />}>
                            <Route path='/signin' element={<Login onLogin={handleLogin} serverError={loginError} />} />
                            <Route path='/signup' element={<Register onRegister={handleRegister} serverError={registrationError} />} />
                        </Route>
                        <Route path='/404' element={<NotFound />} />
                        <Route element={<HeaderLayout loggedIn={loggedIn} onOpenNavigation={handleOpenNavigationClick} />}>
                            <Route element={<ProtectedRoute loggedIn={loggedIn} isLoading={isLoading} />}>
                                <Route
                                    path='/profile'
                                    element={<Profile onUpdateUser={handleUpdateUser} serverError={userUpdateError} onSignOut={signOut} />}
                                />
                            </Route>
                            <Route element={<FooterLayout />}>
                                <Route path='/' element={<Main />} />
                                <Route element={<ProtectedRoute loggedIn={loggedIn} isLoading={isLoading} />}>
                                    <Route
                                        path='/movies'
                                        element={
                                            <Movies
                                                cards={cards}
                                                savedCards={savedCards}
                                                onSaveMovie={handleCardSave}
                                                onDeleteMovie={handleCardDelete}
                                                onFindMovie={handleCardFind}
                                                onOpenTooltip={handleOpenMovieTooltipClick}
                                                isPreloader={isPreloader}
                                                isFilterError={isFilterError}
                                                isFilterNotFound={isMoviesNotFound}
                                                searchText={movieSearchText}
                                                isSearchSlider={isMovieSearchSlider}
                                            />
                                        }
                                    />
                                    <Route
                                        path='/saved-movies'
                                        element={
                                            <SavedMovies
                                                cards={savedCards}
                                                onDeleteMovie={handleCardDelete}
                                                onFindMovie={handleSavedCardFind}
                                                onOpenTooltip={handleOpenMovieTooltipClick}
                                                isPreloader={isPreloader}
                                                isFilterError={isFilterError}
                                                isFilterNotFound={isSavedMoviesNotFound}
                                                searchText={savedMovieSearchText}
                                                isSearchSlider={isSavedMovieSearchSlider}
                                            />
                                        }
                                    />
                                </Route>
                            </Route>
                        </Route>
                        <Route path='*' element={<Navigate to='/404' />} />
                    </Routes>
                </div>
                <Navigation isOpen={isNavigationMenuOpen} onClose={closeNavigation} />
                <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoTooltip} tooltipInfoText={tooltipInfoText} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
