import React from 'react';

function MoviesCard({ card, isSavedCardStyle, isSaved }) {
    return (
        <article className='movie-card'>
            <img className='movie-card__image' src={card.link} alt={card.name + '.'} />
            <div className='movie-card__info'>
                <div className='movie-card__title'>
                    <h2 className='movie-card__name'>{card.name}</h2>
                    {isSavedCardStyle ? (
                        <button className='movie-card__delete-icon button' type='button' aria-label='Удалить фильм'></button>
                    ) : (
                        <button className='movie-card__status-icon button' type='button' aria-label={isSaved ? 'Удалить фильм' : 'Сохранить фильм'}>
                            <div className={`movie-card__status ${isSaved ? 'movie-card__status_saved' : ''}`}></div>
                        </button>
                    )}
                </div>
                <p className='movie-card__duration'>{card.duration}</p>
            </div>
        </article>
    );
}

export default MoviesCard;
