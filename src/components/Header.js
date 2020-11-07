import logo from "../images/header.svg"

function Header() {
  return (
    <header className="header">
      <img alt="Логотип заголовка" className="header__logo" src={logo}/>
    </header>
  );
}

export default Header;
