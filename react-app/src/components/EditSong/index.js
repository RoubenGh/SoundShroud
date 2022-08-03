import './EditSong.css';
import React, { useState, useEffect } from 'react';
import { getAllSongs, editSongTitle } from '../../store/songs';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect, NavLink } from 'react-router-dom';

function EditSong({ setShowModal }) {
	const dispatch = useDispatch();
	const { id } = useParams();

	const oneSong = useSelector((state) => state.songs[id]);
	const user = useSelector((state) => state.session.user);

	const [isLoaded, setIsLoaded] = useState(false);
	const [title, setTitle] = useState('');

	useEffect(() => {
		dispatch(getAllSongs());
		setIsLoaded(true);
	}, [dispatch, id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			id: oneSong.id,
			title,
		};
		dispatch(editSongTitle(data));
		setShowModal(false);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Title Of Song"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default EditSong;
