import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Account from '../Account/Account';

function Navigation({ isOpen, onClose }) {
    const location = useLocation();
    const [currentPath, setCurrentPath] = React.useState(location.pathname);

    React.useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className='navigation'>
                <button className='navigation__close-button button' type='button' aria-label='Закрыть' onClick={onClose}></button>
                <nav>
                    <ul className='navigation__list'>
                        <li className={`navigation__list-item ${currentPath === '/' ? 'navigation__list-item_active' : ''}`}>
                            <NavLink className='navigation__link button' to='/'>
                                Главная
                            </NavLink>
                        </li>
                        <li className={`navigation__list-item ${currentPath === '/movies' ? 'navigation__list-item_active' : ''}`}>
                            <NavLink className='navigation__link button' to='/movies'>
                                Фильмы
                            </NavLink>
                        </li>
                        <li className={`navigation__list-item ${currentPath === '/saved-movies' ? 'navigation__list-item_active' : ''}`}>
                            <NavLink className='navigation__link button' to='/saved-movies'>
                                Сохранённые фильмы
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Account />
            </div>
        </div>
    );
}

export default Navigation;
