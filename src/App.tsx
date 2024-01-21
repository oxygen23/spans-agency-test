import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import GaleryPage from './pages/GaleryPage';
import LoginPage from './pages/LoginPage';
import { selectLogin } from './redux/slices/LoginSlice';
import './styles/index.sass';

const App = () => {
  const state = useSelector(selectLogin);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    setIsLogin(state.name !== '' && state.email !== '');
  }, [state]);
  return (
    <div className="App">
      <Routes>
        <Route element={true ? <GaleryPage /> : <LoginPage />} path="/" />
      </Routes>
    </div>
  );
};

export default App;
