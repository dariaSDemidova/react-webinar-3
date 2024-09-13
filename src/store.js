/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      nextCode: initState.list.length ? initState.list.reduce((acc, item) => Math.max(acc, item.code), 0) + 1 : 1,
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
   * Добавление новой записи
   */
  addItem() {
      const newItem = {
        code: this.state.nextCode,
        title: 'Новая запись',
        selected: false,
        selectCount: 0 
      };
    
    this.setState({
      ...this.state,
      list: [...this.state.list, newItem],
      nextCode: this.state.nextCode + 1
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const isSelected = !item.selected;
          return {
            ...item,
            selected: isSelected,
            selectCount: isSelected ? item.selectCount + 1 : item.selectCount
          };
        } else {
          return {
            ...item,
            selected: false
          };
        } 
      }),
    });
  }
}

export default Store;
