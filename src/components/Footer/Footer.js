import React from 'react';

function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__body'>
                <nav>
                    <ul className='footer__navigation'>
                        <li className='footer__navigation-item'>
                            <a className='footer__navigation-link button' href='https://practicum.yandex.ru/'>
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li className='footer__navigation-item'>
                            <a className='footer__navigation-link button' href='https://github.com/'>
                                Github
                            </a>
                        </li>
                        <li className='footer__navigation-item'>
                            <a className='footer__navigation-link button' href='https://www.facebook.com'>
                                Facebook
                            </a>
                        </li>
                    </ul>
                </nav>
                <p className='footer__subtitle'>&copy;2022</p>
            </div>
        </footer>
    );
}

export default Footer;
