import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import EditComment from './index';

function EditCommentModal({commentId}) {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<button onClick={() => setShowModal(true)}>Edit Comment</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditComment setShowModal={setShowModal} commentId={commentId}/>
				</Modal>
			)}
		</div>
	);
}

export default EditCommentModal;
