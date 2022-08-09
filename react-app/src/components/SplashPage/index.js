import React from 'react';
import './SplashPage.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { getAllSongs } from '../../store/songs';
import SignUpModal from '../auth/SignUpModal';
import LoginModal from '../auth/LoginModal';

function SplashPage({ playSong }) {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.session.user);
	const songsObject = useSelector((state) => state.songs);

	const songs = Object.values(songsObject);
	const sixSongs = songs.slice(0, 6)

	useEffect(() => {
		dispatch(getAllSongs());
	}, []);

	return (
		<div className="splashpage-main">
			<div className="splashpage-top">
				<div className="splashpage-top-container">
					<div className="splashpage-top-container-child">
						<div className="splashpage-top-actual">
							<h2 className="splashpage-top-title">
								What's next in music is first on SoundShroud
							</h2>
							<p className="splashpage-top-ptag">
								Upload your first track and begin your journey.
								SoundShroud gives you space to create, find your fans,
								and connect with other artists.
							</p>
							<a
									className="github-name-footer"
									target="_blank"
									href="https://github.com/RoubenGh"
								>
									<div className="our-names">By: Rouben Ghambaryan</div>
								</a>
						</div>
					</div>
				</div>
				<div className="sound-shroud-logo"> </div>
				<div className="splashpage-login">
					<LoginModal />
					<SignUpModal />
				</div>
			</div>
			<div className="splashpage-bottom-part">
				<div className="splashpage-search"></div>
				<div className="splashpage-songs">
					<div className="splashpage-songs-title">
						Hear what's trending in the SoundShroud community
					</div>
					<div className="splashpage-songs-main">
						{sixSongs.map((song) => {
							return (
								<div key={song.id}>
									<ul className="splashpage-songs-list">
										<li className="splashpage-singlesong">
											<div className="splashpage-singlesong-container">
												<img
													className="splashpage-single-song-art"
													src="https://media.istockphoto.com/vectors/sound-waves-motion-sound-wave-abstract-background-vector-id1176100626?k=20&m=1176100626&s=170667a&w=0&h=im5WAvTOvnPqS1EfPjq6MaQtqfJ-K6-3sy6fQjfST4Q="
													onClick={(e) => {
														playSong(song);
													}}
												/>
												<p>{song.title}</p>
												<p>{song.user_info.username}</p>
											</div>
										</li>
										<li></li>
									</ul>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SplashPage;
