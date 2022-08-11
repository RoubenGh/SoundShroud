import './Discover.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllSongs } from '../../store/songs';
import NavBar from '../NavBar';

function Discover({ playSong }) {
	const history = useHistory() ;
	const dispatch = useDispatch();

	const user = useSelector((state) => state.session.user);
	const songsObject = useSelector((state) => state.songs);

	const songs = Object.values(songsObject);

	useEffect(() => {
		dispatch(getAllSongs());
	}, [dispatch]);


	return (
		<>
			<NavBar />
			<div className="splashpage-search"></div>
			<div className="splashpage-songs"></div>
			<div className="splashpage-songs-main-2">
				<div className="splashpage-songs-title-2">
					Discover SoundShroud's Top Songs
				</div>
				{songs.map((song) => {
					return (
						<div key={song.id}>
							<ul className="splashpage-songs-list">
								<li className="splashpage-singlesong-2">
									<div className="splashpage-singlesong-container">
										<img
											className="splashpage-single-song-art"
											src="https://i.imgur.com/dpxY8Vh.png"
											onClick={(e) => {
												playSong(song);
											}}
										/>
										<div className='discoverpage-clickable-title'>
											<NavLink
											className='title-title-discover'
											to={`/songs/${song.id}`}>
												{song.title}
											</NavLink>
										</div>
										<p className='discover-page-username'>{song.user_info.username}</p>
									</div>
								</li>
								<li></li>
							</ul>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Discover;
