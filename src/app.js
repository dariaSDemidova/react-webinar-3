import React, { useState, useEffect, useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import CartModal from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [cart, setCart] = useState(store.getState().cart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const list = store.getState().list;


  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCart(store.getState().cart);
    });
    return () => unsubscribe();
  }, [store]);

  const handleAddToCart = useCallback(
    (code, quantity) => {
      store.addItemToCart(code, quantity);
    },
    [store],
  );

  const handleDeleteItem = useCallback(
    (code) => {
      store.removeItemFromCart(code);
    },
    [store],
  );

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const itemsCount = Object.keys(cart.items).length;

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        itemsCount={itemsCount}
        totalPrice={cart.totalPrice}
        onOpenCart={openCart}
      />
      <List list={list} onAddToCart={handleAddToCart} />
      {isCartOpen && (
        <ModalLayout onClose={closeCart}>
          <CartModal cart={cart} onClose={closeCart} onDelete={handleDeleteItem} />
        </ModalLayout>
      )}
    </PageLayout>
  );
}

export default App;