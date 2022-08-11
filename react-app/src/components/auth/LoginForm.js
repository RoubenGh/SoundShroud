import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = ({ setShowModal }) => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		} else {
			setShowModal(false);
			return <Redirect to="/discover" />;
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const demoUser = async (e) => {
		const email = 'SoundShroudDemo@aa.io';
		const password = 'password';
		await dispatch(login(email, password));
		setShowModal(false);
		return <Redirect to="/discover" />;
	};

	if (user) {
		return <Redirect to="/discover" />;
	}

	return (
		<>
			<div className="signin-modal-container">
				<div className="signin-modal-container-child">
					<div>
						<h2 className="signin-login-title">Welcome back!</h2>
						<form className="signin-form" onSubmit={onLogin}>
							<div className="signin-login-errors">
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div>
							<div className="signin-email-container">
								<input
									className="signin-email-input"
									name="email"
									type="text"
									placeholder="Email"
									value={email}
									onChange={updateEmail}
									required
								/>
							</div>
							<div className="signin-email-container">
								<input
									className="signin-email-input"
									name="password"
									type="password"
									placeholder="Password"
									value={password}
									onChange={updatePassword}
									required
								/>
							</div>
						</form>
						<div className="signin-button-container">
							<button
								className="signin-btn"
								onClick={onLogin}
								type="submit"
							>
								Sign in
							</button>
						</div>
						<div className="signin-button-container">
							<button
								className="signin-btn"
								onClick={demoUser}
								type="submit"
							>
								Demo
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
