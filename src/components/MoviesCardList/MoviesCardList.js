import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { smallMoviesListSize, mediumMoviesListSize, largeMoviesListSize, littleMoviesListInc, moreMoviesListInc } from '../../utils/constants';

function MoviesCardList({ cards, isSavedCardStyle, savedCards }) {
    const [moviesListInc, setMoviesListInc] = React.useState(0);
    const [moviesListLength, setMoviesListLength] = React.useState(0);

    React.useEffect(() => {
        if (window.innerWidth < 768) {
            setMoviesListLength(smallMoviesListSize);
            setMoviesListInc(littleMoviesListInc);
        } else if ((window.innerWidth >= 768) & (window.innerWidth < 1280)) {
            setMoviesListLength(mediumMoviesListSize);
            setMoviesListInc(littleMoviesListInc);
        } else if (window.innerWidth >= 1280) {
            setMoviesListLength(largeMoviesListSize);
            setMoviesListInc(moreMoviesListInc);
        }
    }, [moviesListInc]);

    const showMoreButtonClassName = `movies-list__more-button ${cards.length <= moviesListLength ? 'movies-list__more-button_hidden' : ''} button`;

    function handleShowMore() {
        setMoviesListLength(moviesListLength + moviesListInc);
    }

    function showSavedCardStatus(card) {
        const isSavedCard = savedCards.find((elem) => elem._id === card._id);
        return isSavedCard ? true : false;
    }

    return (
        <section className='movies-list'>
            <div className='movies-list__cards'>
                {cards.slice(0, moviesListLength).map((card) => (
                    <MoviesCard key={card._id} card={card} isSavedCardStyle={isSavedCardStyle} isSaved={showSavedCardStatus(card)} />
                ))}
            </div>
            <button className={showMoreButtonClassName} onClick={handleShowMore}>
                Еще
            </button>
        </section>
    );
}

export default MoviesCardList;
