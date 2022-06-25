import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, isSavedCardStyle, savedCards, children, moviesListLength, onSaveMovie, onDeleteMovie }) {
    function showSavedCardStatus(card) {
        const isSavedCard = savedCards.find((elem) => elem.movieId === card.movieId);
        return isSavedCard ? true : false;
    }

    return (
        <section className='movies-list'>
            <div className='movies-list__cards'>
                {cards.length > 0
                    ? cards
                          .slice(0, moviesListLength)
                          .map((card) => (
                              <MoviesCard
                                  key={card.movieId}
                                  card={card}
                                  savedCards={savedCards}
                                  isSavedCardStyle={isSavedCardStyle}
                                  isSaved={showSavedCardStatus(card)}
                                  onSaveMovie={onSaveMovie}
                                  onDeleteMovie={onDeleteMovie}
                              />
                          ))
                    : ''}
            </div>
            {children}
        </section>
    );
}

export default MoviesCardList;
