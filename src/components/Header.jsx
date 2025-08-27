import logo from "../assets/images/logo.svg";

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="logo deliveroo" />
      </div>
    </header>
  );
};

export default Header;
