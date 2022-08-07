
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import SignUpModal from './auth/SignUpModal';
import LoginModal from './auth/LoginModal';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          {/* <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink> */}
          <LoginModal />
        </li>
        <li>
          {/* <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Create account
          </NavLink> */}
          <SignUpModal />
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/discover' exact={true} activeClassName='active'>
            Discover
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
