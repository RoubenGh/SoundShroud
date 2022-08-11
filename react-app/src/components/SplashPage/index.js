import React from 'react';
import './SplashPage.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSongs } from '../../store/songs';
import SignUpModal from '../auth/SignUpModal';
import LoginModal from '../auth/LoginModal';
import { BsGithub } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';

function SplashPage({ playSong }) {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.session.user);
	const songsObject = useSelector((state) => state.songs);

	const songs = Object.values(songsObject);
	const sixSongs = songs.slice(0, 6);

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
													src="https://i.imgur.com/dpxY8Vh.png"
													onClick={(e) => {
														playSong(song);
													}}
												/>
												<p className="discoverpage-clickable-title">
													{song.title}
												</p>
												<p className="discover-page-username">
													{song.user_info.username}
												</p>
											</div>
										</li>
									</ul>
								</div>
							);
						})}
					</div>
				</div>
				<div className="aboutlink-container">
					{/* <div>
						<p className='about-ptag'>SoundShroud is a SoundCloud clone made by Rouben Ghambaryan : </p>
					</div> */}
					<div>
						<a
							className="about-links"
							href="https://github.com/RoubenGh"
							target="_blank"
						>
							<BsGithub className='SplashGithub' />
						</a>
					</div>
					<div>
						<a
							className="about-links"
							href="https://www.linkedin.com/in/rouben-ghambaryan-35ba30157/"
							target="_blank"
						>
							<BsLinkedin className='SplashLinkedin' />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SplashPage;
