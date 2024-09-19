import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../cartItem';
import './style.css';

function CartList({ list, onDeleteItem = () => {} }) {
    return (
        <div className="List">
            {list.map(item => (
                <div key={item.code} className="List-item">
                    <CartItem item={item} onDelete={onDeleteItem} />
                </div>
            ))}
        </div>
    );
}

CartList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number.isRequired,
        })
    ).isRequired,
    onDeleteItem: PropTypes.func,
};

export default React.memo(CartList);