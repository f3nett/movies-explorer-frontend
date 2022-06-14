import React from 'react';

function AboutProject() {
    return (
        <section className='project'>
            <h2 className='project__title'>О проекте</h2>
            <ul className='project__info'>
                <li className='project__info-cell'>
                    <h3 className='project__info-title'>Дипломный проект включал 5 этапов</h3>
                    <p className='project__info-text'>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </li>
                <li className='project__info-cell'>
                    <h3 className='project__info-title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='project__info-text'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </li>
            </ul>
            <div className='project__line'>
                <div className='project__backend-rectangle'>
                    <p className='project__text project__text_color_backend'>1 неделя</p>
                </div>
                <div className='project__frontend-rectangle'>
                    <p className='project__text project__text_color_frontend'>4 недели</p>
                </div>
                <p className='project__text project__text_color_underrectangle'>Back-end</p>
                <p className='project__text project__text_color_underrectangle'>Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;
