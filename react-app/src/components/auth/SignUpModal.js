import React, { useState } from 'react';
import { Modal } from '../../context/modal'
import SignUpForm from './SignUpForm';

const SignUpModal = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button className='splashpage-create-account-btn' onClick={() => setShowModal(true)}>Create account</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SignUpForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
};

export default SignUpModal;
