import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound() {
    return (
        <div className='error'>
            <div className='error__block'>
                <h1 className='error__title'>404</h1>
                <p className='error__subtitle'>Страница не найдена</p>
            </div>
            <NavLink className='error__return-button button' to='/'>
                Назад
            </NavLink>
        </div>
    );
}

export default NotFound;
