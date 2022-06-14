import React from 'react';

function Techs() {
    return (
        <section className='technologies'>
            <h2 className='technologies__title'>Технологии</h2>
            <div className='technologies__about'>
                <p className='technologies__about-subtitle'>7 технологий</p>
                <p className='technologies__about-text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className='technologies__techs'>
                <li className='technologies__tech-cell'>HTML</li>
                <li className='technologies__tech-cell'>CSS</li>
                <li className='technologies__tech-cell'>JS</li>
                <li className='technologies__tech-cell'>React</li>
                <li className='technologies__tech-cell'>Git</li>
                <li className='technologies__tech-cell'>Express.js</li>
                <li className='technologies__tech-cell'>mongoDB</li>
            </ul>
        </section>
    );
}

export default Techs;
