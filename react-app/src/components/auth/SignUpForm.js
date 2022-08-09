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
			username.length >= 4 &&
			email.length <= 255 &&
			email.length >= 9 &&
			email.match(emailRegex) &&
			password.length <= 255 &&
			password.length >= 8 &&
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
			if (username.length < 4 || username.length > 40) {
				validationErrors.push(
					'username : Username must be between 4 and 40 characters'
				);
			}
			if (!email) {
				validationErrors.push('email : Email is required');
			}
			if (!email.match(emailRegex)) {
				validationErrors.push('email : Email is not valid');
			}
			if (email.length < 9 || email.length > 255) {
				validationErrors.push(
					'email : Email must be between 9 and 255 characters'
				);
			}
			if (password.length < 8 || password.length > 255) {
				validationErrors.push(
					'password : Password must be between 8 and 255 characters'
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
		<div className="signin-modal-container">
			<div className="signin-modal-container-child">
				<div>
					<h2 className="signin-login-title">
						Create your SoundShroud account
					</h2>
					<form className="signin-form" onSubmit={onSignUp}>
						<div className="signin-login-errors">
							{errors.map((error, ind) => (
								<div key={ind}>{error}</div>
							))}
						</div>
						<div className="signin-email-container">
							<input
								className="signin-email-input"
								type="text"
								name="username"
								placeholder="Username"
								onChange={updateUsername}
								value={username}
								required
							></input>
						</div>
						<div className="signin-email-container">
							<input
								className="signin-email-input"
								type="text"
								name="email"
								placeholder="Email"
								onChange={updateEmail}
								value={email}
								required
							></input>
						</div>
						<div className="signin-email-container">
							<input
								className="signin-email-input"
								type="password"
								name="password"
								placeholder="Password"
								onChange={updatePassword}
								value={password}
								required
							></input>
						</div>
						<div className="signin-email-container">
							<input
								className="signin-email-input"
								type="password"
								name="repeat_password"
								onChange={updateRepeatPassword}
								value={repeatPassword}
								placeholder="Confirm Password"
								required
							></input>
						</div>
						<div className="signin-button-container">
							<button className="signin-btn" type="submit">
								Continue
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
