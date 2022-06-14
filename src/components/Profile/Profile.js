import React from 'react';
import useFormValidation from '../../hooks/useFormValidation';

function Profile({ userName, userEmail }) {
    const { values, handleChange, isValid } = useFormValidation({ defaultValues: { name: userName, email: userEmail }, defaultValid: true });

    return (
        <main className='profile'>
            <form className='profile__form'>
                <h2 className='profile__title'>Привет, {userName}!</h2>
                <div className='profile__data-cell profile__data-cell_border_regular'>
                    <p className='profile__data-name'>Имя</p>
                    <input
                        id='input_name'
                        className='profile__data-value'
                        type='text'
                        name='name'
                        required
                        minLength='2'
                        maxLength='30'
                        onChange={handleChange}
                        value={values['name']}
                    />
                </div>
                <div className='profile__data-cell profile__data-cell_border_none'>
                    <p className='profile__data-name'>E-mail</p>
                    <input
                        id='input_email'
                        className='profile__data-value'
                        type='email'
                        name='email'
                        required
                        onChange={handleChange}
                        value={values['email']}
                    />
                </div>
                <span className={`profile__error ${isValid ? '' : 'profile__error_active'}`}>Что-то пошло не так</span>
                <button className='profile__submit button' type='submit'>
                    Редактировать
                </button>
                <button className='profile__exit button' type='button'>
                    Выйти из аккаунта
                </button>
            </form>
        </main>
    );
}

export default Profile;
