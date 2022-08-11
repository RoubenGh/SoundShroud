import React from 'react';
import {
	getCommentsBySongId,
	addCommentBySongId,
	deleteCommentBySongId,
} from '../../store/comments';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect, NavLink } from 'react-router-dom';
import EditComment from '../EditComment';
import EditCommentModal from '../EditComment/EditCommentModal';

function AllComments() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();

	const oneSong = useSelector((state) => state.songs[id]);
	const user = useSelector((state) => state.session.user);
	const commentObject = useSelector((state) => state.comments);

	const singleComment = Object.values(commentObject);

	const [isLoaded, setIsLoaded] = useState(false);
	const [comment, setComment] = useState('');

	useEffect(() => {
		dispatch(getCommentsBySongId(id));
		setIsLoaded(true);
	}, [dispatch, id]);

	const commentDeleter = (e, comment) => {
		console.log('2222222222', comment);

		const data = {
			song_id: oneSong.id,
			id: comment.id,
		};

		dispatch(deleteCommentBySongId(data));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			history.push('/login');
			return;
		}

		const data = {
			user_id: user.id,
			song_id: oneSong.id,
			content: comment,
			username: user.username,
		};

		await dispatch(addCommentBySongId(data));
		setComment('');
	};

	return (
		isLoaded && (
			<div className="allcomments-container">
				<div>
					<div className="addcomment-container">
						<form
							onSubmit={handleSubmit}
							className="addcomment-input-container"
						>
							<div className="testinginputwidth">
								<input
									className="addingacomment-input"
									type="text"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									placeholder="Write a comment"
								/>
							</div>
							<div className="submitbutton-container">
								<button className="submit-comment-btn" type="submit">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="allcomments-single-container-actual">
					{singleComment.map((comment) => (
						<div key={comment.id}>
							<div className="single-comment-container">
								<div className="actual-single-comment">
									<div className="comments-username">
										<p className="comments-username-p">
											{comment.username}
										</p>
									</div>
									<div className="comments-comments">
										<p className="comments-comments-p">
											{comment.content}
										</p>
									</div>
								</div>
								<div className="singlecomment-bts">
									{comment?.user_id === user?.id ? (
										<div>
											<div className='singlecomment-edit-btn-container'>
												<EditCommentModal commentId={comment.id} />
											</div>
											<div>
												<button className='singlecomment-edit-btn'
													id={comment.id}
													onClick={(e) =>
														commentDeleter(e, comment)
													}
												>
													Delete
												</button>
											</div>
										</div>
									) : (
										<></>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	);
}

export default AllComments;
