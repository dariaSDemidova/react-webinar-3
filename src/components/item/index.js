import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item = { code: 0, title: 'Неизвестный товар', price: 0 }, onAddToCart }) {

  const handleAddToCart = () => {
    onAddToCart(item, 1);
  };

  const formatPrice = (price) => price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 });

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{formatPrice(item.price)}</div>
      <div className="Item-actions">
        <button onClick={handleAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(Item);