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
			<div>
				<div>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Add a comment"
						/>
						<button type="submit">Submit</button>
					</form>
				</div>
				<div>
					{singleComment.map((comment) => (
						<div key={comment.id}>
							<h2>{comment.content}</h2>
							{comment?.user_id === user?.id ? (
								<div>
									<EditCommentModal commentId={comment.id} />
									<button
										id={comment.id}
										onClick={(e) => commentDeleter(e, comment)}
									>
										Delete Comment
									</button>
								</div>
							) : (
								<></>
							)}

							<p>{comment.username}</p>
						</div>
					))}
				</div>
			</div>
		)
	);
}

export default AllComments;
