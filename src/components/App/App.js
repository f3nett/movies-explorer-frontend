import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import { cardList, savedCardList } from '../../utils/cardList';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(true);
    const [userName, setUserName] = React.useState('Виталий');
    const [userEmail, setUserEmail] = React.useState('pochta@yandex.ru');
    const [cards, setCards] = React.useState(cardList);
    const [savedCards, setSavedCards] = React.useState(savedCardList);

    const [isNavigationMenuOpen, setIsNavigationMenuOpen] = React.useState(false);

    function handleOpenNavigationClick() {
        setIsNavigationMenuOpen(true);
    }

    function closeNavigation() {
        setIsNavigationMenuOpen(false);
    }

    return (
        <div className='page'>
            <div className='page__content'>
                <Routes>
                    <Route path='/signin' element={<Login />} />
                    <Route path='/signup' element={<Register />} />
                    <Route path='/404' element={<NotFound />} />
                    <Route element={<HeaderLayout loggedIn={loggedIn} onOpenNavigation={handleOpenNavigationClick} />}>
                        <Route path='/profile' element={<Profile userName={userName} userEmail={userEmail} />} />
                        <Route element={<FooterLayout />}>
                            <Route path='/' element={<Main />} />
                            <Route path='/movies' element={<Movies cards={cards} savedCards={savedCards} />} />
                            <Route path='/saved-movies' element={<SavedMovies cards={savedCards} />} />
                        </Route>
                    </Route>
                    <Route path='*' element={<Navigate to='/404' />} />
                </Routes>
            </div>
            <Navigation isOpen={isNavigationMenuOpen} onClose={closeNavigation} />
        </div>
    );
}

export default App;
