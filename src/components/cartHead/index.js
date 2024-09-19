import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент шапки модального окна корзины с кнопкой закрытия
 * @param title {string} Заголовок модального окна
 * @param onClose {Function} Функция для закрытия модального окна
 * @returns {React.ReactElement}
 */
function CartHead({ title = 'Корзина', onClose }) {
    return (
        <div className="CartHead">
            <h1>{title}</h1>
            <button className="CartHead-close" onClick={onClose}>Закрыть</button>
        </div>
    );
}

CartHead.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default React.memo(CartHead);
