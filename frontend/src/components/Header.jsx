import {useState, useEffect, useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';

import {AuthContext} from '../contexts/AuthContext';
import logo from '../images/logo_white.svg';


const Header = props => {
  const {isLoggedIn, userEmail} = useContext(AuthContext);
  const {pathname} = useLocation();
  
  const [isAccountMenuShown, setIsAccountMenuShown] = useState(false);
  
  const toggleAccountMenu = () => {
    setIsAccountMenuShown(!isAccountMenuShown);
  };
  
  useEffect(() => {
    setIsAccountMenuShown(false);
  }, [props.isMobile]);
  
  return (
    <header className="header">
      <div className={`header__account ${isAccountMenuShown && 'header__account_opened'}`}>
        <div className="header__account-container">
          <p className="header__account-user-info">d.klimkin@icloud.com</p>
          <button
            className="header__account-button"
            onClick={() => {
              setIsAccountMenuShown(false);
              props.onSignOut();
            }}
          >Выйти</button>
        </div>
      </div>
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Место Россия."/>
        {pathname === '/sign-up' && <Link className="header__link" to="/sign-in" replace={true}>Войти</Link>}
        {pathname === '/sign-in' && <Link className="header__link" to="/sign-up" replace={true}>Регистрация</Link>}
        {isLoggedIn
          && props.isMobile
            ? <div className="burger" onClick={toggleAccountMenu}>
                <div className={`burger__icon ${isAccountMenuShown && 'burger__icon_turned-into-cross'}`}></div>
              </div>
            : <div className="header__account-container">
                <p className="header__account-user-info">{userEmail}</p>
                <button className="header__account-button" onClick={props.onSignOut}>Выйти</button>
              </div>
        }
      </div>
    </header>
  );
};

export default Header;