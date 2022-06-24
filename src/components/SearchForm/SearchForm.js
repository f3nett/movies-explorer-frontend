import React from 'react';

function SearchForm({ onFindMovie, onOpenTooltip, isLockForm, searchText, isSearchSlider }) {
    const [isCheckedSlider, setIsCheckedSlider] = React.useState(isSearchSlider);
    const [searchedMovie, setSearchedMovie] = React.useState(searchText);

    const handleSearchTextChange = (e) => {
        const { value } = e.target;
        setSearchedMovie(value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (searchedMovie === '') {
            onOpenTooltip();
        } else {
            onFindMovie(searchedMovie, isCheckedSlider);
        }
    }

    function toggleSwitch() {
        onFindMovie(searchedMovie, !isCheckedSlider);
    }

    return (
        <section className='searchform'>
            <form className='searchform__content'>
                <div className='searchform__input'>
                    <input
                        className='searchform__input-box'
                        id='input_search'
                        type='text'
                        name='searchText'
                        placeholder='Фильм'
                        required
                        value={searchedMovie}
                        onChange={handleSearchTextChange}
                        readOnly={isLockForm}
                    />
                    <button className='searchform__submit-button button' type='submit' disabled={isLockForm} onClick={handleSubmit}>
                        Найти
                    </button>
                </div>
                <label className='searchform__slider'>
                    <input
                        className='searchform__slider-input'
                        type='checkbox'
                        name='isSearchSlider'
                        disabled={isLockForm}
                        onChange={() => setIsCheckedSlider(!isCheckedSlider)}
                        onClick={toggleSwitch}></input>
                    <span className={`searchform__switch ${isCheckedSlider ? 'searchform__switch_active' : ''}`}></span>
                    <p className='searchform__slider-text'>Короткометражки</p>
                </label>
            </form>
        </section>
    );
}

export default SearchForm;
