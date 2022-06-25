import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import useWindowSize from '../../hooks/useWindowSize';
import { SMALL_LIST_SIZE, MEDIUM_LIST_SIZE, LARGE_LIST_SIZE, SMALL_LIST_INC, LARGE_LIST_INC } from '../../utils/constants';

function Movies({
    cards,
    savedCards,
    onSaveMovie,
    onDeleteMovie,
    onFindMovie,
    onOpenTooltip,
    isPreloader,
    isFilterError,
    isFilterNotFound,
    searchText,
    isSearchSlider,
}) {
    const { windowSize } = useWindowSize();
    const isSavedCardStyle = false;
    const [moviesListInc, setMoviesListInc] = React.useState(0);
    const [moviesListLength, setMoviesListLength] = React.useState(0);

    React.useEffect(() => {
        if (windowSize.width < 768) {
            setMoviesListLength(SMALL_LIST_SIZE);
            setMoviesListInc(SMALL_LIST_INC);
        } else if ((windowSize.width >= 768) & (windowSize.width < 1280)) {
            setMoviesListLength(MEDIUM_LIST_SIZE);
            setMoviesListInc(SMALL_LIST_INC);
        } else if (windowSize.width >= 1280) {
            setMoviesListLength(LARGE_LIST_SIZE);
            setMoviesListInc(LARGE_LIST_INC);
        }
    }, [windowSize.width]);

    function handleShowMore() {
        setMoviesListLength(moviesListLength + moviesListInc);
    }

    return (
        <main className='movies'>
            <SearchForm
                onFindMovie={onFindMovie}
                onOpenTooltip={onOpenTooltip}
                isLockForm={isPreloader}
                searchText={searchText}
                isSearchSlider={isSearchSlider}
            />
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
                    savedCards={savedCards}
                    moviesListLength={moviesListLength}
                    onSaveMovie={onSaveMovie}
                    onDeleteMovie={onDeleteMovie}>
                    <button
                        className={`movies-list__more-button ${cards.length <= moviesListLength ? 'movies-list__more-button_hidden' : ''} button`}
                        onClick={handleShowMore}>
                        Еще
                    </button>
                </MoviesCardList>
            )}
        </main>
    );
}

export default Movies;
