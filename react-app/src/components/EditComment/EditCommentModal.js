import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import EditComment from './index';

function EditCommentModal({commentId}) {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<button className='singlecomment-edit-btn' onClick={() => setShowModal(true)}>Edit</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditComment setShowModal={setShowModal} commentId={commentId}/>
				</Modal>
			)}
		</div>
	);
}

export default EditCommentModal;
