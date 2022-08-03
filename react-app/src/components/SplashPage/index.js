import React from 'react';
import './SplashPage.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { getAllSongs } from '../../store/songs';

function SplashPage({ playSong }) {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.session.user);
	const songsObject = useSelector((state) => state.songs);

	const songs = Object.values(songsObject);

	useEffect(() => {
		dispatch(getAllSongs());
	}, []);

	return (
		<div>
			{songs.map((song) => {
				return (
					<div key={song.id}>
						<button
							onClick={(e) => {
								playSong(song);
							}}
						>
							{song.title}
						</button>
						<p>{song.username}</p>
					</div>
				);
			})}
		</div>
	);
}

export default SplashPage;
