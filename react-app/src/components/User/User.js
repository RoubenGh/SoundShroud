import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSongs } from '../../store/songs';
import './User.css';
import { getSingleUser } from '../../store/user';

function User() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	// const [user, setUser] = useState({});
	const { userId } = useParams();
	const usersObject = useSelector((state) => state.user);
	let user;
	if (usersObject) {
		user = usersObject[userId];
	}

	const songsObject = useSelector((state) => state.songs);
	const songs = Object.values(songsObject);

	useEffect(() => {
		dispatch(getSingleUser(userId));
		dispatch(getAllSongs());
	}, [dispatch, userId]);

	if (!user) {
		return null;
	}

	if (!sessionUser) return <Redirect to="/login" />;

	return (
		<div className="profileWholeContainer">
			<div className="info-images">
				<div className="Topprof">
					<div className="Profpiccontainer">
						<img
							className="profPic"
							src={user.prof_pic_url}
							alt="profile pic"
						/>
					</div>
					<div className="allinfo">
						<div className="userandedit">
							<p className="profUsername">{user?.username}</p>
							{/* {account.id === parseInt(userId) ? (
								<div className="edit-prof-button">
									<NavLink className="edit-prof" to="/accounts/edit">
										Edit profile
									</NavLink>
								</div>
							) : (
								<></>
							)} */}
						</div>
						<div className="prof-description-container">
							<p className="profDescription">{user.description}</p>
						</div>
					</div>
				</div>

				<div className="imgContainer">
					{songs.map((song) => (
						<div key={song.id}>
							<NavLink exact to={`/images/${song.id}`}>
								{parseInt(userId) === song.user_id ? (
									<div className="profsongs">
										<img
											alt="uploaded"
											className="profsong"
											src={song.song_url}
										/>
									</div>
								) : (
									<></>
								)}
							</NavLink>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default User;
