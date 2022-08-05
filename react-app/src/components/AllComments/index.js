import React from 'react';
import { getCommentsBySongId, addCommentBySongId } from '../../store/comments';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect, NavLink } from 'react-router-dom';

function AllComments() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();

	const oneSong = useSelector((state) => state.songs[id]);
	// console.log(oneSong, 'this is my one song --------');
	const user = useSelector((state) => state.session.user);
    const commentObject = useSelector((state) => state.comments);

    const singleComment = Object.values(commentObject)
    console.log(singleComment, '922222222222222222222222')

	const [isLoaded, setIsLoaded] = useState(false);
	const [comment, setComment] = useState('');


	useEffect(() => {
		dispatch(getCommentsBySongId(id));
		setIsLoaded(true);
	}, [dispatch, id]);

	const notLoggedIn = () => {
		if (!user) history.push('/login');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			user_id: user.id,
			song_id: oneSong.id,
			content: comment,
			username: user.username,
		};

		await dispatch(addCommentBySongId(data));
		setComment('');
	};

	if (!user) return <Redirect to="/login" />;

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
							<p>{comment.content}</p>
							<p>{comment.username}</p>
						</div>
					))}
				</div>
			</div>
		)
        )
    }



export default AllComments;
