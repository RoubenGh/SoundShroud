import './EditSong.css';
import React, { useState, useEffect } from 'react';
import { getAllSongs, editSongTitle } from '../../store/songs';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function EditSong({ setShowModal }) {
	const dispatch = useDispatch();
	const { id } = useParams();

	const oneSong = useSelector((state) => state.songs[id]);
	const user = useSelector((state) => state.session.user);


	const [isLoaded, setIsLoaded] = useState(false);
	const [title, setTitle] = useState(oneSong.title);
	const [validationError, setValidationError] = useState([]);

	useEffect(() => {
		dispatch(getAllSongs());
		setIsLoaded(true);
	}, [dispatch, id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setValidationError([]);
		const errors = [];

		const data = {
			id: oneSong.id,
			title,
		};

		if (!title) errors.push('Title is required');
		if (title.length > 20)
			errors.push('Title must be less than 20 characters');
		if (errors.length) {
			setValidationError(errors);
			return;
		} else {
			dispatch(editSongTitle(data));
			setShowModal(false);
		}
	};

	return (
		<div className="editsongtitle-container">
			<div className="editmodal-ptag-title">
				<p>Edit Song Title</p>
			</div>
			<div className="editmodal-form-container">
				<form onSubmit={handleSubmit}>
					<div className="signin-login-errors">
						{validationError.map((error, idx) => (
							<div key={idx}>{error}</div>
						))}
					</div>
					<div>
						<input
							className="titleofsong-input3"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<button className="signin-btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditSong;
