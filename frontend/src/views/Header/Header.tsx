import "./Header.css";

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <header>
      <h1>{children}</h1>
    </header>
  );
};

export default Header;
