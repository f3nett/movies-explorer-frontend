import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ cards, savedCards }) {
    const isSavedCardStyle = false;

    return (
        <main className='movies'>
            <SearchForm />
            <MoviesCardList cards={cards} isSavedCardStyle={isSavedCardStyle} savedCards={savedCards} />
        </main>
    );
}

export default Movies;
