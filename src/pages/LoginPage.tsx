import {
  FC, useState,
} from 'react';

import SignupForm from '../components/Form/SignupForm';
import {
  OrPng, Social, Social2, Social3,
} from '../images/index.js';

const LoginPage: FC = () => {
  const [page, setPage] = useState<number>(0);

  function changePageToLogin(): void {
    setPage(0);
  }
  function changePageToSignUp(): void {
    setPage(1);
  }
  return (
    <div className="login-wrapper">
      <div className="login">
        <div className="login-left">
          <div className="login-left_buttons">
            <button className={page === 0 ? 'login-left_buttons-button active' : 'login-left_buttons-button'} onClick={changePageToLogin} type="button">Log in</button>
            <button className={page === 1 ? 'login-left_buttons-button active' : 'login-left_buttons-button'} onClick={changePageToSignUp} type="button">Sign up</button>
          </div>
          <div className="login-left_icons">
            <img alt="" className="login-left_icons-icon" src={Social} />
            <img alt="" className="login-left_icons-icon" src={Social2} />
            <img alt="" className="login-left_icons-icon" src={Social3} />
          </div>
          <img alt="" src={OrPng} />
          <SignupForm />
        </div>
        {' '}
        <div className="login-right" />
      </div>
    </div>
  );
};

export default LoginPage;
