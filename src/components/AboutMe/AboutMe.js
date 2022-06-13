import React from 'react';
import studentPhoto from '../../images/student-photo.png';

function AboutMe() {
    return (
        <section className='student'>
            <h2 className='student__title'>Студент</h2>
            <div className='student__info'>
                <img className='student__photo' src={studentPhoto} alt='Фотография студента.' />
                <div className='student__about'>
                    <div className='student__main-info'>
                        <p className='student__name'>Виктория</p>
                        <p className='student__specialization'>Фронтенд-разработчик, 33 года</p>
                        <p className='student__description'>
                            Живу в Москве, имею опыт работы 9 лет в DWH системным аналитиком / архитектором данных. Прошла обучение в ЯПрактикуме по
                            специальности Веб-разработчик, т.к. не хочу засиживаться в уже знакомой области и укреплять свой синдром незнакомца, а
                            стремлюсь к изучению нового. В настоящий момент морально готовлюсь снова стать джуном.
                        </p>
                    </div>
                    <ul className='student__links'>
                        <li className='student__link'>
                            <a className='student__link-text button' href='https://www.facebook.com'>
                                Facebook
                            </a>
                        </li>
                        <li className='student__link'>
                            <a className='student__link-text button' href='https://github.com/f3nett'>
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
