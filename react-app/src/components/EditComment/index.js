import React, { useState, useEffect } from 'react';
import { editCommentBySongId } from '../../store/comments';
import { getAllSongs, editSongTitle } from '../../store/songs';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect, NavLink } from 'react-router-dom';
import { getSingleCommentBySongId } from '../../store/singlecomment';
import './EditComment.css';

function EditComment({ setShowModal, commentId }) {
	const dispatch = useDispatch();
	const { id } = useParams();
	console.log(commentId, 'gholasdgei');

	const oneSong = useSelector((state) => state.songs[id]);

	const user = useSelector((state) => state.session.user);

	const [isLoaded, setIsLoaded] = useState(false);
	const singleComment = Object.values(
		useSelector((state) => state?.singleComment)
	)[0];
	// const comment = singleComment?.content;
	const [content, setContent] = useState('');
	const [errors, setErrors] = useState([]);
	const commentObject = useSelector((state) => state.comments);

	// new use effect set content with comment when comment changes havve the dependency on singleComment

	useEffect(() => {
		setContent(singleComment?.content);
		setIsLoaded(true);
	} ,[singleComment]);

	useEffect(() => {
		dispatch(getAllSongs()).then(
			dispatch(getSingleCommentBySongId(id, commentId))
		);
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
			{/* {singleComment.map((comment) => (
				<div key={comment.id}>
					{console.log(singl)} */}
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
						<div className="textarea-container-editcomment">
							<textarea
								className="titleofsong-input4"
								// placeholder={comment}
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
		// ))}
		// </div>
	);
}

export default EditComment;
