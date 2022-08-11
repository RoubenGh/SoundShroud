import React, {useState} from 'react';
import { Modal } from '../../context/modal';
import EditSong from './index';

function EditSongModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<button  className='singlesongpage-dlt-btn' onClick={() => setShowModal(true)}>Edit Title</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditSong setShowModal={setShowModal} />
				</Modal>
			)}
		</div>
	);

}

export default EditSongModal;
