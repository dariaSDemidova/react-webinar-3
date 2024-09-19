import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onDelete = () => {} }) {

    const callbacks = {
        onDelete: e => {
            e.stopPropagation();
            onDelete(item.code);
        },
    };

    return (
        <div className="Item">
            <div className="Item-code">{item.code}</div>
            <div className="Item-title">{item.title}</div>
            <div className="Item-price">{item.price}₽</div>
            <div className="Item-quantity">{item.quantity}шт</div>
            <div className="Item-actions">
                <button onClick={callbacks.onDelete}>Удалить</button>
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
