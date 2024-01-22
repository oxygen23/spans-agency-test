import { ChangeEvent, FC, RefObject } from 'react';

import { Avatar, Logo } from '../../images/index';
import styles from './Header.module.sass';

interface HeaderProps {
  fileRef: RefObject<HTMLInputElement>
  handleButtonClick: () => void
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Header: FC<HeaderProps> = ({ fileRef, handleButtonClick, handleFileChange }) => (
  <header className={`container ${styles.header} `}>
    <div className="header_left">
      <img alt="logo" src={Logo} />
    </div>
    <div className={`${styles.header_right}`}>
      <nav className={`${styles.header_right__navbar}`}>
        <li className={`${styles.header_right__navbar_item}`}>Galery</li>
        <li className={`${styles.header_right__navbar_item}`}>About</li>
        <li className={`${styles.header_right__navbar_item}`}>Store</li>
      </nav>
      <div>
        <img alt="" className={`${styles.header_right__image}`} src={Avatar} />
      </div>
      <button className={`${styles.header_right__button}`} onClick={handleButtonClick} type="button">
        Make magic
        <input
          onChange={handleFileChange}
          ref={fileRef}
          style={{ display: 'none' }}
          type="file"
        />

      </button>
    </div>
  </header>
);

export default Header;
