import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

/**
 * Компонент шапки сайта с информацией о корзине
 * @param itemsCount {number} Количество уникальных товаров
 * @param totalPrice {number} Общая сумма
 * @param onOpenCart {Function} Функция для открытия модального окна корзины
 * @returns {React.ReactElement}
 */
function Controls({ itemsCount = 0, totalPrice = 0, onOpenCart }) {
  const formatPrice = (price) => price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 });

  return (
    <div className="Controls">
      {itemsCount === 0 
        ? 'В корзине: пусто' 
        : `В корзине: ${itemsCount} ${plural(itemsCount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${formatPrice(totalPrice)}`}
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