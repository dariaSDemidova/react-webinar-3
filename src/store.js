import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      cart: {
        items: {},
        totalQuantity: 0,
        totalPrice: 0,
      },
      ...initState,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item {Object} Товар с полями code, title, price
   * @param quantity {number} Количество товара для добавления
   */
  addItemToCart(item, quantity = 1) {
    const { cart } = this.state;
    const existingItem = cart.items[item.code];

    const updatedItem = existingItem
      ? { ...existingItem, quantity: existingItem.quantity + quantity }
      : { ...item, quantity };

    const updatedItems = {
      ...cart.items,
      [item.code]: updatedItem,
    };

    const totalQuantity = Object.values(updatedItems).reduce(
      (sum, currentItem) => sum + currentItem.quantity,
      0
    );

    const totalPrice = Object.values(updatedItems).reduce(
      (sum, currentItem) => sum + currentItem.price * currentItem.quantity,
      0
    );

    this.setState({
      ...this.state,
      cart: {
        items: updatedItems,
        totalQuantity,
        totalPrice,
      },
    });
  }

  /**
   * Удаление товара из корзины
   * @param code {number} Код товара для удаления
   */
  removeItemFromCart(code) {
    const { cart } = this.state;

    if (!cart.items[code]) return;

    const { [code]: removedItem, ...remainingItems } = cart.items;

    const totalQuantity = Object.values(remainingItems).reduce(
      (sum, currentItem) => sum + currentItem.quantity,
      0
    );

    const totalPrice = Object.values(remainingItems).reduce(
      (sum, currentItem) => sum + currentItem.price * currentItem.quantity,
      0
    );

    this.setState({
      ...this.state,
      cart: {
        items: remainingItems,
        totalQuantity,
        totalPrice,
      },
    });
  }
}

export default Store;