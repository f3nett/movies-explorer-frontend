import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ cards, onDeleteMovie, onFindMovie, onOpenTooltip, isPreloader, isFilterError, isFilterNotFound}) {
    const isSavedCardStyle = true;
    const [moviesListLength, setMoviesListLength] = React.useState(cards.length);

    return (
        <main className='movies'>
            <SearchForm onFindMovie={onFindMovie} onOpenTooltip={onOpenTooltip} isBlockSearch={isPreloader}/>
            {isPreloader ? (
                <Preloader />
            ) : isFilterNotFound ? (
                <p className='movies__error'>Ничего не найдено</p>
            ) : isFilterError ? (
                <p className='movies__error'>
                    Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
                </p>
            ) : (
                <MoviesCardList
                    cards={cards}
                    isSavedCardStyle={isSavedCardStyle}
                    savedCards={cards}
                    moviesListLength={moviesListLength}
                    onDeleteMovie={onDeleteMovie}
                />
            )}
        </main>
    );
}

export default SavedMovies;
