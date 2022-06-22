import React from 'react';

function MoviesCard({ card, savedCards, isSavedCardStyle, isSaved, onSaveMovie, onDeleteMovie }) {
    function handleSave() {
        onSaveMovie(card);
    }

    function handleDeleteSaved() {
        onDeleteMovie(card);
    }

    function handleDeleteMain() {
        let deletedCard = savedCards.find((c) => c.movieId === card.movieId);
        onDeleteMovie(deletedCard);
    }

    function handleClick() {
        window.open(card.trailerLink, '_blank');
    }

    return (
        <article className='movie-card'>
            <img className='movie-card__image button' src={card.image} alt={card.nameRU + '.'} onClick={handleClick}/>
            <div className='movie-card__info'>
                <div className='movie-card__title'>
                    <h2 className='movie-card__name'>{card.nameRU}</h2>
                    {isSavedCardStyle ? (
                        <button
                            className='movie-card__delete-icon button'
                            type='button'
                            aria-label='Удалить фильм'
                            onClick={handleDeleteSaved}></button>
                    ) : isSaved ? (
                        <button className='movie-card__status-icon button' type='button' aria-label='Удалить фильм' onClick={handleDeleteMain}>
                            <div className='movie-card__status movie-card__status_saved'></div>
                        </button>
                    ) : (
                        <button className='movie-card__status-icon button' type='button' aria-label='Сохранить фильм' onClick={handleSave}>
                            <div className='movie-card__status'></div>
                        </button>
                    )}
                </div>
                <p className='movie-card__duration'>{Math.round(card.duration / 60) + 'ч' + (card.duration % 60) + 'м'}</p>
            </div>
        </article>
    );
}

export default MoviesCard;
