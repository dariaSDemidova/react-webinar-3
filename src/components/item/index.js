import { useNavigate } from 'react-router-dom';
import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const navigate = useNavigate();

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
  };

  const handleItemClick = () => {
    const productUrl = props.url || `/product/${props.item._id}`;
    navigate(productUrl);
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={handleItemClick}>{props.item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  url: PropTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  url: '',
};

export default memo(Item);