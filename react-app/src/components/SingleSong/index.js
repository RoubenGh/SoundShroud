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
	console.log(oneSong);
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
				<div className="singlesongpage-main">
					<div className="singlesongpage-left-container">
						<img
							className="singlesongpage-albumart"
							src="https://i.imgur.com/dpxY8Vh.png"
							onClick={(e) => {
								playSong(oneSong);
							}}
						/>
						<div className="singlesongpage-title">{oneSong.title}</div>
						<div className="singlesongpage-username">
							{oneSong.user_info.username}
						</div>
						{oneSong?.user_id === user?.id ? (
							<div className='singlesongpage-editdlt-btns-container'>
								<EditSongModal />
								<button className='singlesongpage-dlt-btn' onClick={songDeleter}>Delete Song</button>
							</div>
						) : (
							<></>
						)}
					</div>
					<div className="singlesongpage-right-container">
						<AllComments />
					</div>
				</div>
			</>
		)
	);
}

export default SingleSong;
