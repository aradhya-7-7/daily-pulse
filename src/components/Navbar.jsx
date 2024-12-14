import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>General</NavLink>
      <NavLink to="/business">Business</NavLink>
      <NavLink to="/sports">Sports</NavLink>
      <NavLink to="/entertainment">Entertainment</NavLink>
      <NavLink to="/summary" className="summary-btn">News Summary</NavLink>
    </nav>
  );
}

export default Navbar;