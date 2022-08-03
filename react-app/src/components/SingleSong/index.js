import './SingleSong.css';
import React from 'react';
import { getAllSongs, editSongTitle } from '../../store/songs';
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

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	const data = {
    //         id: oneSong.id,
	// 		title,
	// 	};
	// 	dispatch(editSongTitle(data));
	// };

	// if (!oneSong) return null;

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
				<EditSongModal />
			</div>
		)
	);
}

export default SingleSong;
