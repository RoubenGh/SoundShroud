import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ setShowModal }) => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const onSignUp = async (e) => {
		e.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const validationErrors = [];

		if (
			username.length <= 40 &&
			email.length <= 255 &&
			password.length <= 255 &&
			password === repeatPassword
		) {
			const data = await dispatch(signUp(username, email, password));

			if (data) {
				setErrors(data);
			} else {
				setShowModal(false);
				history.push('/discover');
			}
		} else {
			if (!username) {
				validationErrors.push('username : Username is required');
			}
			if (username.length > 40) {
				validationErrors.push(
					'username : Username must be less than 40 characters'
				);
			}
			if (!email) {
				validationErrors.push('email : Email is required');
			}
			if (!email.match(emailRegex)) {
				validationErrors.push('email : Email is not valid');
			}
			if (email.length > 255) {
				validationErrors.push(
					'email : Email must be less than 255 characters'
				);
			}
			if (!password || !repeatPassword) {
				validationErrors.push('password : Password is required');
			}
			if (password.length > 255) {
				validationErrors.push(
					'password : Password must be less than 255 characters'
				);
			} else {
				if (password !== repeatPassword) {
					validationErrors.push('password : Passwords do not match');
				}
			}
			setErrors(validationErrors);
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form onSubmit={onSignUp}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				<label>User Name</label>
				<input
					type="text"
					name="username"
					onChange={updateUsername}
					value={username}
				></input>
			</div>
			<div>
				<label>Email</label>
				<input
					type="text"
					name="email"
					onChange={updateEmail}
					value={email}
				></input>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					name="password"
					onChange={updatePassword}
					value={password}
				></input>
			</div>
			<div>
				<label>Repeat Password</label>
				<input
					type="password"
					name="repeat_password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
			</div>
			<button type="submit">Sign Up</button>
		</form>
	);
};

export default SignUpForm;
