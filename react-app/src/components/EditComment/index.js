import React, { useState, useEffect } from 'react';
import { editCommentBySongId } from '../../store/comments';
import { getAllSongs, editSongTitle } from '../../store/songs';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect, NavLink } from 'react-router-dom';


function EditComment({ setShowModal, commentId }) {
    const dispatch = useDispatch();
	const { id } = useParams();

	const oneSong = useSelector((state) => state.songs[id]);

	const user = useSelector((state) => state.session.user);

	const [isLoaded, setIsLoaded] = useState(false);
	const [content, setContent] = useState('');

    useEffect(() => {
		dispatch(getAllSongs());
		setIsLoaded(true);
	}, [dispatch, id]);

    const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			song_id: oneSong.id,
			content,
			id: commentId

		};
		dispatch(editCommentBySongId(data));
		setShowModal(false);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Comment"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default EditComment;
