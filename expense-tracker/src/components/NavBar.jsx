import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link')}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/reports"
        className={({ isActive }) => (isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link')}
      >
        Reports
      </NavLink>
    </nav>
  );
}
