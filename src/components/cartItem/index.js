import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onDelete = () => {} }) {
    const formatPrice = (price) => price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 });

    const handleDelete = () => {
        onDelete(item.code);
    };

    return (
        <div className="Item">
            <div className="Item-code">{item.code}</div>
            <div className="Item-title">{item.title}</div>
            <div className="Item-price">{formatPrice(item.price)}</div>
            <div className="Item-quantity">{item.quantity}шт</div>
            <div className="Item-actions">
                <button onClick={handleDelete}>Удалить</button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
    }).isRequired,
    onDelete: PropTypes.func,
};

export default React.memo(CartItem);