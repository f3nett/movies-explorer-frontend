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
import { filterMovies, filterMoviesByDuration } from '../../utils/filterMovies';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [cards, setCards] = React.useState([]);
    const [allSavedCards, setAllSavedCards] = React.useState([]);
    const [savedCards, setSavedCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({ _id: null, email: '', name: '' });
    const [registrationError, setRegistrationError] = React.useState('');
    const [loginError, setLoginError] = React.useState('');
    const [userUpdateError, setUserUpdateError] = React.useState('');
    const [isNavigationMenuOpen, setIsNavigationMenuOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [isPreloader, setIsPreloader] = React.useState(false);
    const [isFilterNotFound, setIsFilterNotFound] = React.useState(false);
    const [isFilterError, setIsFilterError] = React.useState(false);
    let navigate = useNavigate();

    React.useEffect(() => {
        tokenCheck();
    }, []);

    React.useEffect(() => {
        tokenCheck();
        if (loggedIn) {
            Promise.all([mainApi.getUser(), mainApi.getMovies()])
                .then(([userData, savedMoviesData]) => {
                    setCurrentUser(userData);
                    setAllSavedCards(savedMoviesData);
                    setSavedCards(savedMoviesData);
                    setCards(JSON.parse(localStorage.getItem('movies')) || []);
                })
                .catch((err) => {
                    console.log(err);
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
        localStorage.removeItem('searchText');
        localStorage.removeItem('searchSlider');
        setLoggedIn(false);
        setCurrentUser({ _id: '', email: '', name: '' });
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
    function handleCardFind(searchText, isShortFilter) {
        setIsPreloader(true);
        setIsFilterError(false);
        setIsFilterNotFound(false);
        moviesApi
            .getMovies()
            .then((movies) => {
                if ((searchText === '') & isShortFilter) {
                    setCards(filterMoviesByDuration(movies, isShortFilter));
                } else if ((searchText === '') & !isShortFilter) {
                    setSavedCards(movies);
                } else {
                    setCards(filterMovies(movies, searchText, isShortFilter));
                }
                localStorage.setItem('movies', JSON.stringify(cards));
            })
            .catch((err) => {
                console.log(err);
                setIsFilterError(true);
            })
            .finally(() => {
                if (cards.length === 0) {
                    setIsFilterNotFound(true);
                }
                setIsPreloader(false);
            });
    }

    function handleSavedCardFind(searchText, isShortFilter) {
        setIsPreloader(true);
        if ((searchText === '') & isShortFilter) {
            setSavedCards(filterMoviesByDuration(allSavedCards, isShortFilter));
        } else if ((searchText === '') & !isShortFilter) {
            setSavedCards(allSavedCards);
        } else {
            setSavedCards(filterMovies(allSavedCards, searchText, isShortFilter));
        }
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

    function handleOpenTooltipClick() {
        setIsInfoTooltipOpen(true);
    }

    function closeInfoTooltip() {
        setIsInfoTooltipOpen(false);
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
                                                onOpenTooltip={handleOpenTooltipClick}
                                                isPreloader={isPreloader}
                                                isFilterError={isFilterError}
                                                isFilterNotFound={isFilterNotFound}
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
                                                onOpenTooltip={handleOpenTooltipClick}
                                                isPreloader={isPreloader}
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
                <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoTooltip} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
