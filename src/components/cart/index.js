import React from 'react';
import PropTypes from 'prop-types';
import CartHead from '../cartHead';
import CartList from '../cartList';
import './style.css';

function CartModal({ cart, onClose = () => {}, onDelete = () => {} }) {
  return (
    <div className="CartModal">
      <div className="CartModal-content">
        <CartHead onClose={onClose} />
        <CartList list={Object.values(cart.items)} onDeleteItem={onDelete} />
        <div className="CartModal-total">
          Итого: {cart.totalPrice}₽
        </div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.object,
    totalPrice: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(CartModal);