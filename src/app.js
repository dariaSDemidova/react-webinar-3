import React, { useState, useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [cart, setCart] = useState({ items: {}, totalPrice: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const list = store.getState().list;


  const handleAddToCart = useCallback(
    (code, quantity) => {
      const item = list.find(i => i.code === code);
      const currentQuantity = cart.items[code]?.quantity || 0;
      const newQuantity = currentQuantity + quantity;
      const newTotalPrice = cart.totalPrice + item.price * quantity;

      setCart(prevCart => ({
        ...prevCart,
        items: {
          ...prevCart.items,
          [code]: {
            ...item,
            quantity: newQuantity,
          },
        },
        totalPrice: newTotalPrice,
      }));
    },
    [cart, list],
  );

  const handleDeleteItem = (code) => {
    const newItems = { ...cart.items };
    const deletedItemPrice = newItems[code].price * newItems[code].quantity;
    
    delete newItems[code];
    
    setCart({
      items: newItems,
      totalPrice: cart.totalPrice - deletedItemPrice,
    });
  };

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
      {isCartOpen && <CartModal cart={cart} onClose={closeCart} onDelete={handleDeleteItem} />}
    </PageLayout>
  );
}

export default App;