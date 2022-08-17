import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs } from '../../store/songs';
import './User.css'
import { getSingleUser } from '../../store/user';

function User() {
	const [user, setUser] = useState({});
	const { userId } = useParams();

	useEffect(() => {
		if (!userId) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/users/${userId}`);
			const user = await response.json();
			setUser(user);
		})();
	}, [userId]);

	if (!user) {
		return null;
	}

	return (
		<ul>
			<li>
				<strong>User Id</strong> {userId}
			</li>
			<li>
				<strong>Username</strong> {user.username}
			</li>
			<li>
				<strong>Email</strong> {user.email}
			</li>
			<li>
				<img src={user.prof_pic_url}/>

			</li>
		</ul>
	);
}
export default User;
