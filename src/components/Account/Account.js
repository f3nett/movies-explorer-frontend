import React from 'react';
import { NavLink } from 'react-router-dom';

function Account() {
    return (
        <NavLink className='button' to='/profile'>
            <button className='profile-button' type='button' aria-label='Параметры аккаунта'>
                <p className='profile-button__text'>Аккаунт</p>
                <div className='profile-button__image'>
                    <div className='profile-button__icon'></div>
                </div>
            </button>
        </NavLink>
    );
}

export default Account;
