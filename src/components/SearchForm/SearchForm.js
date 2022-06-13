import React from 'react';

function SearchForm() {
    const [seachedFilm, setSeachedFilm] = React.useState('');
    const [isShortFilmFilter, setIsShortFilmFilter] = React.useState(true);

    function handleChange(e) {
        const { value } = e.target;
        setSeachedFilm(value);
    }

    function toggleSwitch() {
        if (isShortFilmFilter) {
            setIsShortFilmFilter(false);
        } else {
            setIsShortFilmFilter(true);
        }
    }

    return (
        <section className='searchform'>
            <form className='searchform__content'>
                <div className='seachform__input'>
                    <input
                        className='seachform__input-box'
                        id='input_seach'
                        type='text'
                        name='film'
                        placeholder='Фильм'
                        value={seachedFilm}
                        onChange={handleChange}
                    />
                    <button className='seachform__submit-button button' type='submit'>
                        Найти
                    </button>
                </div>
                <div className='seachform__slider'>
                    <button
                        className={`seachform__switch ${isShortFilmFilter ? 'seachform__switch_active' : ''}`}
                        type='button'
                        onClick={toggleSwitch}></button>
                    <p className='seachform__slider-text'>Короткометражки</p>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;
