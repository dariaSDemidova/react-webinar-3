import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import Product from './product';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </Router>
  );
}

export default App;
