import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import LoginForm from './LoginForm';

const LoginModal = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button  className='splash-page-login-btn' onClick={() => setShowModal(true)}>Sign in</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<LoginForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
};

export default LoginModal;
