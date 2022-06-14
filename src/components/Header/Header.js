import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Account from '../Account/Account';

function Header({ loggedIn, onOpenNavigation }) {
    const location = useLocation();
    const [currentPath, setCurrentPath] = React.useState(location.pathname);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        if (window.innerWidth <= 768) setIsMobile(true);
        else setIsMobile(false);
    }, []);

    React.useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);

    return (
        <header className={`header ${currentPath === '/' ? 'header__root_main' : 'header__root_movies'}`}>
            <Logo />
            {loggedIn ? (
                isMobile ? (
                    <button className='header__menu-button button' 
                    type='button' 
                    aria-label='Открыть меню' 
                    onClick={onOpenNavigation}>
                        <div className='header__menu-image'></div>
                    </button>
                ) : (
                    <div className='header__sign-block'>
                        <nav>
                            <ul className='header__links'>
                                <li className='header__link-cell'>
                                    <NavLink className={`header__link ${currentPath === '/movies' ? 'header__link_active' : ''} button`} to='/movies'>
                                        Фильмы
                                    </NavLink>
                                </li>
                                <li className='header__link-cell'>
                                    <NavLink
                                        className={`header__link ${currentPath === '/saved-movies' ? 'header__link_active' : ''} button`}
                                        to='/saved-movies'>
                                        Сохранённые фильмы
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <Account />
                    </div>
                )
            ) : (
                <div className='header__sign-block'>
                    <NavLink className='header__signup button' to='/signup'>
                        Регистрация
                    </NavLink>
                    <NavLink className='header__signin button' to='/signin'>
                        Войти
                    </NavLink>
                </div>
            )}
        </header>
    );
}

export default Header;
