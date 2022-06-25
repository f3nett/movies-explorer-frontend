import React from 'react';

function InfoTooltip({ isOpen, onClose, tooltipInfoText }) {
    return (
        <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className='tooltip'>
                <button className='tooltip__close-button button' type='button' aria-label='Закрыть' onClick={onClose}></button>
                <p className='tooltip__text'>{tooltipInfoText}</p>
            </div>
        </div>
    );
}

export default InfoTooltip;
