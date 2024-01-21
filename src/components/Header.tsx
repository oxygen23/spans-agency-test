import { FC } from 'react';

import { Avatar, Logo } from '../images/index.js';

const Header: FC = () => (
  <header className="header container">
    <div className="header-left">
      <img alt="logo" src={Logo} />
    </div>
    <div className="header-right">
      <nav className="header-right_navbar">
        <li className="header-right_navbar-item">Galery</li>
        <li className="header-right_navbar-item">About</li>
        <li className="header-right_navbar-item">Store</li>
      </nav>
      <div>
        <img alt="" className="header-right_image" height={40} src={Avatar} width={40} />
      </div>
      <button className="header-right_button" type="button">Make magic</button>
    </div>
  </header>
);

export default Header;
