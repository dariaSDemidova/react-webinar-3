import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useSession from '../hooks/use-session';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Authorization from './authorization';
import User from './user';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const { restoreSession } = useSession();

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Authorization />} /> 
        <Route path={'/profile'} element={<User/>}/> 
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;