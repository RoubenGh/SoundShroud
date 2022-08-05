import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import UploadSong from './components/UploadSong';
import Discover from './components/Discover';
import SplashPage from './components/SplashPage';
import SingleSong from './components/SingleSong';

import './index.css';
import { getAllSongs } from './store/songs';


function App() {
	const [loaded, setLoaded] = useState(false);
	const [currentSong, setCurrentSong] = useState('');
	const [currentSongTitle, setCurrentSongTitle] = useState('There Is No Current Song Playing');
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			await dispatch(getAllSongs());
			setLoaded(true);
		})();
	}, [dispatch]);

	const playSong = async (song) => {
		setCurrentSongTitle(song.title)
		await setCurrentSong(song.song_url)


	};


	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<Route path="/" exact={true}>
					<SplashPage playSong={playSong}/>
				</Route>
				<Route path="/upload" exact={true}>
					<UploadSong />
				</Route>
				<Route path="/discover" exact={true}>
					<Discover playSong={playSong}/>
				</Route>
				<Route path="/songs/:id" exact={true}>
					<SingleSong playSong={playSong}/>
				</Route>
			</Switch>
			<div className="audio-player-footer">
				<AudioPlayer
					// autoPlay
					src={currentSong}
					onPlay={(e) => console.log('onPlay')}
					volume={0.1}
					header={currentSongTitle}
					// other props here
				/>
			</div>
		</BrowserRouter>
	);
}

export default App;
