import React from 'react';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <nav>
                <ul className='portfolio__links'>
                    <li className='portfolio__link'>
                        <a className='portfolio__link-cell button' href='https://github.com/f3nett/how-to-learn'>
                            <p className='portfolio__link-text'>Статичный сайт</p>
                            <p className='portfolio__link-symbol'>&#8599;</p>
                        </a>
                    </li>
                    <li className='portfolio__link'>
                        <a className='portfolio__link-cell button' href='https://github.com/f3nett/russian-travel'>
                            <p className='portfolio__link-text'>Адаптивный сайт</p>
                            <p className='portfolio__link-symbol'>&#8599;</p>
                        </a>
                    </li>
                    <li className='portfolio__link'>
                        <a className='portfolio__link-cell button' href='https://github.com/f3nett/react-mesto-auth'>
                            <p className='portfolio__link-text'>Одностраничное приложение</p>
                            <p className='portfolio__link-symbol'>&#8599;</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </section>
    );
}

export default Portfolio;
