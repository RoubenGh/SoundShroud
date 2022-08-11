import './SingleSong.css';
import React from 'react';
import { getAllSongs, deleteSong } from '../../store/songs';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect, NavLink } from 'react-router-dom';
import EditSongModal from '../EditSong/EditSongModal';
import AllComments from '../AllComments';
import NavBar from '../NavBar';

function SingleSong({ playSong }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();

	const oneSong = useSelector((state) => state.songs[id]);
	const user = useSelector((state) => state.session.user);

	const [isLoaded, setIsLoaded] = useState(false);
	// const [title, setTitle] = useState('');

	useEffect(() => {
		dispatch(getAllSongs());
		setIsLoaded(true);
	}, [dispatch, id]);

	const songDeleter = (e) => {
		dispatch(deleteSong(oneSong));
		history.push('/discover');
	};

	return (
		isLoaded && (
			<>
			<NavBar />
				<div className='singlesongpage-main'>
					<button
						onClick={(e) => {
							playSong(oneSong);
						}}
					>
						{oneSong.title}
					</button>
					{oneSong?.user_id === user?.id ? (
						<div>
							<EditSongModal />
							<button onClick={songDeleter}>Delete Song</button>
						</div>
					) : (
						<></>
					)}
					<AllComments />
				</div>
			</>
		)
	);
}

export default SingleSong;
