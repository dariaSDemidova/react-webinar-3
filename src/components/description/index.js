import { memo, useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import './style.css';

function Description({ item, onAdd }) {
    const cn = bem('Description');

    useEffect(() => {
        console.log('Текущий товар:', item);
    }, [item]);

    const handleAddToCart = () => {
        onAdd(item._id);
    };

    return (
        <div className={cn()}>
            <div className={cn('description')}>{item.description}</div>
            <div className={cn('country')}>Страна производитель: <span>{item.madeIn?.title || 'Не указано'}</span></div>
            <div className={cn('category')}>Категория: <span>{item.category?.title || 'Не указано'}</span></div>
            <div className={cn('edition')}>Год выпуска: <span>{item.edition || 'Не указано'}</span></div>
            <div className={cn('price')}>Цена: {numberFormat(item.price)} ₽</div>
            <button onClick={handleAddToCart} className={cn('button')}>Добавить</button>
        </div>
    );
}

Description.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        description: PropTypes.string,
        madeIn: PropTypes.shape({
            title: PropTypes.string,
        }),
        category: PropTypes.shape({
            title: PropTypes.string,
        }),
        edition: PropTypes.number,
        price: PropTypes.number,
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default memo(Description);
