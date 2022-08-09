import './Discover.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { getAllSongs } from '../../store/songs';
import NavBar from '../NavBar';

function Discover({ playSong }) {
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
			<div>
				{songs.map((song) => {
					return (
						<div key={song.id}>
							<button
								onClick={(e) => {
									playSong(song);
								}}
							>
								<NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
							</button>
							<p>{song.username}</p>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Discover;
