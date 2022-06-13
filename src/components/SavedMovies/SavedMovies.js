import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ cards }) {
    const isSavedCardStyle = true;

    return (
        <main className='movies'>
            <SearchForm />
            <MoviesCardList cards={cards} isSavedCardStyle={isSavedCardStyle} savedCards={cards} />
        </main>
    );
}

export default SavedMovies;
