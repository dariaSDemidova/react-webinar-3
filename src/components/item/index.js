import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item = { code: 0, title: 'Неизвестный товар', price: 0 }, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(prevQuantity => prevQuantity);
    onAddToCart(item.code, quantity + 1);
  };

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{item.price}₽</div>
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
