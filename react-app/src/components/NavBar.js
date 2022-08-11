import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
	return (
		<nav className="navbar-main">
			<ul className="navbar-buttons-left-main">
				<li className="navbar-left-logo">
					<NavLink
						className="logotest"
						to="/discover"
						exact={true}
					></NavLink>
				</li>
				<li className="navbar-please-work">
					<NavLink
						to="/discover"
						exact={true}
						className="navebar-home-btn"
					>
						Home
					</NavLink>
				</li>
				<li className="navbar-please-work-2">
					<NavLink
						className="navebar-home-btn-2"
						to="/upload"
						exact={true}
					>
						Upload
					</NavLink>
				</li>
				<li></li>
				<li className="navbar-please-work-3">
					<div className="navbar-logoutbtn-move-toleft">
						<LogoutButton />
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
