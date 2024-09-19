import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент шапки сайта с информацией о корзине
 * @param itemsCount {number} Количество уникальных товаров
 * @param totalPrice {number} Общая сумма
 * @param onOpenCart {Function} Функция для открытия модального окна корзины
 * @returns {React.ReactElement}
 */
function Controls({ itemsCount = 0, totalPrice = 0, onOpenCart }) {
  return (
    <div className="Controls">
      {itemsCount === 0 ? 'В корзине: пусто' : `В корзине: ${itemsCount} / ${totalPrice}₽`}
      <button onClick={onOpenCart}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  itemsCount: PropTypes.number,
  totalPrice: PropTypes.number,
  onOpenCart: PropTypes.func.isRequired,
};

export default React.memo(Controls);