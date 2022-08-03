import './UploadSong.css';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uploadSong } from '../../store/songs';

function UploadSong() {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.session.user);

	const [title, setTitle] = useState('');
	const [file, setFile] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			title,
			file,
			userId: user?.id,
			username: user?.username,
		};

		dispatch(uploadSong(data));
		history.push('/discover');
	};

	const handleUpload = async (e) => {
		const uploadFile = e.target.files[0];
		setFile(uploadFile);
	};

	return (
		<div>
			<h3>Upload Song</h3>
			<div>
				<div>
					<input
						placeholder="Title Of Song"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<div>
						<input
							type="file"
							name="upload song"
							onChange={handleUpload}
							accept=".mp3, .mp4"
						/>
						<strong>{file?.name}</strong>
						<button type="submit">Submit</button>
					</div>
				</form>

			</div>
		</div>
	);
}

export default UploadSong;
