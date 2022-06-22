import React from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onUpdateUser, serverError, onSignOut }) {
    const currentUser = React.useContext(CurrentUserContext);

    const { values, handleChange, isValid, setIsValid, errors } = useFormValidation({
        defaultValues: { email: currentUser.email, name: currentUser.name },
        defaultValid: true,
        defaultValidations: {
            name: {
                pattern: /^([a-zа-яё ]+)$/i,
                errorMessage: 'Поле может содержать только буквы, дефис и пробел',
            },
        },
    });

    React.useEffect(() => {
        // помимо валидности формы проверяем, что значения изменились
        if (isValid & ((currentUser.name === values['name']) & (currentUser.email === values['email']))) {
            setIsValid(false);
        }
    }, [values]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ email: values['email'], name: values['name'] });
    }

    return (
        <main className='profile'>
            <form className='profile__form'>
                <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
                <div className='profile__data-cell profile__data-cell_border_none'>
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
                <span className={`profile__error ${errors['name'] ? 'profile__error_active' : ''} profile__error_position_value`}>
                    {errors['name']}
                </span>
                <div className='profile__data-cell profile__data-cell_border_regular'>
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
                <span className={`profile__error ${errors['email'] ? 'profile__error_active' : ''} profile__error_position_value`}>
                    {errors['email']}
                </span>
                <span className={`profile__error ${serverError ? 'profile__error_active' : ''} profile__error_position_summary`}>{serverError}</span>
                <button
                    className={`profile__submit ${isValid ? '' : 'profile__submit_inactive'} button`}
                    type='submit'
                    disabled={!isValid}
                    onClick={handleSubmit}>
                    Редактировать
                </button>
                <button className='profile__exit button' type='button' onClick={onSignOut}>
                    Выйти из аккаунта
                </button>
            </form>
        </main>
    );
}

export default Profile;
