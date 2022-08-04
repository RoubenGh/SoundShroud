import './SingleSong.css';
import React from 'react';
import { getAllSongs, deleteSong } from '../../store/songs';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect, NavLink } from 'react-router-dom';
import EditSongModal from '../EditSong/EditSongModal';

function SingleSong({ playSong }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();

	const oneSong = useSelector((state) => state.songs[id]);
	console.log('this is my one song', oneSong);
	const user = useSelector((state) => state.session.user);

	const [isLoaded, setIsLoaded] = useState(false);
	// const [title, setTitle] = useState('');

	useEffect(() => {
		dispatch(getAllSongs());
		setIsLoaded(true);
	}, [dispatch, id]);

	const songDeleter = (e) => {
		dispatch(deleteSong(oneSong));
		console.log('IM IN THE SONGDELETER FUNCTION')
		history.push('/discover');
	};

	return (
		isLoaded && (
			<div>
				<button
					onClick={(e) => {
						playSong(oneSong);
					}}
				>
					{oneSong.title}
				</button>
				<div>
					<EditSongModal />
				</div>
				<div>
					<button onClick={songDeleter}>Delete Song</button>
				</div>
			</div>
		)
	);
}

export default SingleSong;
