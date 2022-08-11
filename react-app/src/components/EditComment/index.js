import React, { useState, useEffect } from 'react';
import { editCommentBySongId } from '../../store/comments';
import { getAllSongs, editSongTitle } from '../../store/songs';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect, NavLink } from 'react-router-dom';
import './EditComment.css'

function EditComment({ setShowModal, commentId }) {
	const dispatch = useDispatch();
	const { id } = useParams();

	const oneSong = useSelector((state) => state.songs[id]);

	const user = useSelector((state) => state.session.user);

	const [isLoaded, setIsLoaded] = useState(false);
	const [content, setContent] = useState('');
	const [errors, setErrors] = useState([]);
	const commentObject = useSelector((state) => state.comments);
	const singleComment = Object.values(commentObject);

	useEffect(() => {
		dispatch(getAllSongs());
		setIsLoaded(true);
	}, [dispatch, id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const validationErrors = [];

		if (content.length > 500)
			validationErrors.push('Comment must be less than 500 characters');

		if (validationErrors.length) {
			setErrors(validationErrors);
			return;
		}

		const data = {
			song_id: oneSong.id,
			content,
			id: commentId,
		};
		dispatch(editCommentBySongId(data));
		setShowModal(false);
	};

	return (
		<div>
			{singleComment.map((comment) => (
				<div key={comment.id}>
					<div className="editsongtitle-container-4">
						<div className="editmodal-ptag-title">
							<p>Edit Your Comment</p>
						</div>
						<div className="editmodal-form-container">
							<form onSubmit={handleSubmit}>
								<div className="signin-login-errors">
									{errors.map((error, ind) => (
										<div key={ind}>{error}</div>
									))}
								</div>
								<div className='textarea-container-editcomment'>
									<textarea
										className="titleofsong-input4"
										placeholder={comment.content}
										value={content}
										onChange={(e) => setContent(e.target.value)}
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
				</div>
			))}
		</div>
	);
}

export default EditComment;
