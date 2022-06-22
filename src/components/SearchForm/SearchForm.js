import React from 'react';

function SearchForm({ onFindMovie, onOpenTooltip, isBlockSearch }) {
    const [searchText, setSearchText] = React.useState({ movie: localStorage.getItem('searchText') || '' });
    const [isShortFilmFilter, setIsShortFilmFilter] = React.useState(localStorage.getItem('searchSlider') === 'false' ? false : true);
    const { movie } = searchText;

    function handleChange(e) {
        const { name, value } = e.target;
        setSearchText({ ...searchText, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem('searchText', movie);
        localStorage.setItem('searchSlider', isShortFilmFilter);
        if (movie === '') {
            onOpenTooltip();
        } else {
            onFindMovie(movie, isShortFilmFilter);
        }
    }

    function toggleSwitch() {
        if (isShortFilmFilter) {
            console.log('вкл');
            setIsShortFilmFilter(false);
            onFindMovie(movie, false);
        } else {
            console.log('выкл');
            setIsShortFilmFilter(true);
            onFindMovie(movie, true);
        }
    }

    return (
        <section className='searchform'>
            <form className='searchform__content'>
                <div className='searchform__input'>
                    <input
                        className='searchform__input-box'
                        id='input_search'
                        type='text'
                        name='movie'
                        placeholder='Фильм'
                        required
                        value={movie}
                        onChange={handleChange}
                        readOnly={isBlockSearch}
                    />
                    <button className='searchform__submit-button button' type='submit' disabled={isBlockSearch} onClick={handleSubmit}>
                        Найти
                    </button>
                </div>
                <div className='searchform__slider'>
                    <button
                        className={`searchform__switch ${isShortFilmFilter ? 'searchform__switch_active' : ''}`}
                        type='button'
                        disabled={isBlockSearch}
                        onClick={toggleSwitch}></button>
                    <p className='searchform__slider-text'>Короткометражки</p>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;
