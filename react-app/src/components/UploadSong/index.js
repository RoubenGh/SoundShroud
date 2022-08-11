import './UploadSong.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uploadSong } from '../../store/songs';
import NavBar from '../NavBar';

function UploadSong() {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.session.user);

	const [title, setTitle] = useState('');
	const [file, setFile] = useState(null);
	const [validationError, setValidationError] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setValidationError([]);
		const errors = [];

		const data = {
			title,
			file,
			user_id: user?.id,
			username: user?.username,
		};

		if (file.type !== 'audio/mpeg' && file.type !== 'video/mp4')
			errors.push('Selected File is not Supported!');// selected file is not supported
		if (title.length > 20) errors.push('Title must be less than 20 characters');// title is too long
		if (errors.length) {
			setValidationError(errors);
			return;
		} else {
			dispatch(uploadSong(data));
			history.push('/discover');
		}
	};

	const handleUpload = async (e) => {
		const uploadFile = e.target.files[0];
		setFile(uploadFile);
	};

	return (
		<>
			<NavBar />
			<div className="upload-main-container">
				<div className="main-upload">
					<div className="upload-song-title">
						<h3 className="signin-login-title">Upload Song</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='signin-login-errors'>
							{validationError.map((error, idx) => (
								<div key={idx}>{error}</div>
							))}
						</div>
						<div className="title-upload-container">
							<input

								className="titleofsong-input"
								placeholder="Title Of Song"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</div>
						<div className="title-upload-container">
							<label></label>
							<input
								className="titleofsong-input2"
								type="file"
								name="upload song"
								onChange={handleUpload}
								accept=".mp3, .mp4"
								/>
						</div>
						<div className="title-upload-container">
							<button className="submit-button-upload" type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default UploadSong;
