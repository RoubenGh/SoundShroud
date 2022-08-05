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

		if (
			file.type !== 'audio/mpeg'
			&&
			file.type !== 'video/mp4'
		)
			errors.push('Selected File is not Supported!'); // selected file is not supported
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
					{validationError.map((error, idx) => (
						<div key={idx}>{error}</div>
					))}
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
