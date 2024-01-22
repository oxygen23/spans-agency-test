import {
  FC, useState,
} from 'react';

import SignupForm from '../components/Form/SignupForm';
import {
  OrPng, Social, Social2, Social3, imageLogin,
} from '../images/index';
import styles from './LoginPage.module.sass';

const LoginPage: FC = () => {
  const [page, setPage] = useState<number>(0);

  function changePageToLogin(): void {
    setPage(0);
  }

  function changePageToSignUp(): void {
    setPage(1);
  }

  return (
    <div className={`${styles.login_wrapper}`}>
      <div className={`${styles.login}`}>
        <div className={`${styles.login_left}`}>
          <div className={`${styles.login_left__buttons}`}>
            <button
              className={page === 0
                ? `${styles.login_left__buttons_button} ${styles.active}`
                : `${styles.login_left__buttons_button}`}
              onClick={changePageToLogin}
              type="button"
            >
              Log in

            </button>
            <button
              className={page === 1
                ? `${styles.login_left__buttons_button} ${styles.active}`
                : `${styles.login_left__buttons_button}`}
              onClick={changePageToSignUp}
              type="button"
            >
              Sign up
            </button>
          </div>
          <div className={`${styles.login_left__icons}`}>
            <img alt="" className={`${styles.login_left__icons_icon}`} src={Social} />
            <img alt="" className={`${styles.login_left__icons_icon}`} src={Social2} />
            <img alt="" className={`${styles.login_left__icons_icon}`} src={Social3} />
          </div>
          <img alt="" src={OrPng} />
          <SignupForm />
        </div>
        <div className={`${styles.login_right}`}>
          <p>
            Try out
            <span> AI’s features</span>
          </p>
          <img alt="" src={imageLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
