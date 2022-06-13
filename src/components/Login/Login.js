import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useFormValidation from '../../hooks/useFormValidation';

function Login() {
    const { handleChange, errors, isValid } = useFormValidation({
        defaultValues: { email: '', password: '' },
        defaultValid: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <main className='signin'>
            <div className='signin__top'>
                <Logo />
                <h1 className='signin__title'>Рады видеть!</h1>
            </div>
            <form className='signin__form'>
                <div className='signin__input-cell'>
                    <p className='signin__subtitle'>E-mail</p>
                    <input
                        id='input_email'
                        className={`signin__input ${errors['email'] === '' ? '' : 'signin__input-error'}`}
                        type='email'
                        name='email'
                        required
                        onChange={handleChange}
                    />
                    <span id='signin__error-email' className={`signin__error ${errors['email'] === '' ? '' : 'signin__error_active'}`}>
                        {errors['email']}
                    </span>
                </div>
                <div className='signin__input-cell'>
                    <p className='signin__subtitle'>Пароль</p>
                    <input
                        id='input_pass'
                        className={`signin__input ${errors['password'] === '' ? '' : 'signin__input-error'}`}
                        type='password'
                        name='password'
                        required
                        minLength='8'
                        onChange={handleChange}
                    />
                    <span id='signin__error-password' className={`signin__error ${errors['password'] === '' ? '' : 'signin__error_active'}`}>
                        {errors['password']}
                    </span>
                </div>
            </form>
            <div className='signin__bottom'>
                <button className={`signin__submit ${isValid ? '' : 'signin__submit_inactive'} button`} type='submit' onClick={handleSubmit}>
                    Войти
                </button>
                <p className='signin__info'>
                    Ещё не зарегистрированы?
                    <NavLink className='signin__info-reference button' to='/signup'>
                        Регистрация
                    </NavLink>
                </p>
            </div>
        </main>
    );
}

export default Login;