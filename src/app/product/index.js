import { useParams } from 'react-router-dom';
import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import Description from '../../components/description';
import useSelector from '../../store/use-selector';

function Product() {
    const { id } = useParams();
    const store = useStore();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function loadProduct() {
            try {
                const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const data = await response.json();
                console.log(data);
                setProduct(data.result);
                
                if (!store.getState().catalog.list.some(item => item._id === data.result._id)) {
                    store.getState().catalog.list.push(data.result);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        loadProduct();
    }, [id, store]);

    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    };

    return (
        <PageLayout>
            <Head title={product?.title || 'Название товара'} />
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            {product && <Description item={product} onAdd={callbacks.addToBasket} />}
        </PageLayout>
    );
}

export default memo(Product);
