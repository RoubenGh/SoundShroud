export const GET_SONGS = 'GET_SONGS';
export const GET_SONG = 'GET_SONG';
export const ADD_SONG = 'ADD_SONG';
export const EDIT_SONG = 'EDIT_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';

const getSongs = (songs) => ({
	type: GET_SONGS,
	songs,
});

const getSong = (song) => ({
	type: GET_SONG,
	song,
});

const addSong = (song) => ({
	type: ADD_SONG,
	song,
});

// const editSong = (song) => ({
// 	type: EDIT_SONG,
// 	song,
// });

// const removeSong = (song) => ({
// 	type: REMOVE_SONG,
// 	song,
// });

export const getAllSongs = () => async (dispatch) => {
	const response = await fetch('/api/songs/discover');

	if (response.ok) {
		const data = await response.json();
		dispatch(getSongs(data));
	}
};

export const getSongById = (id) => async (dispatch) => {
	const response = await fetch(`/api/songs/${id}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getSong(data));
		return data;
	}
};

export const uploadSong = (song) => async (dispatch) => {
	const { user_id, title, file, username } = song;

	const form = new FormData();
	form.append('user_id', user_id);
	form.append('title', title);
	form.append('file', file);
	form.append('username', username);
	const response = await fetch('/api/songs/upload', {
		method: 'POST',
		body: form,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addSong(data));
		return data;
	}
};

// REDUCER

const initialState = {};

const songReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_SONGS:
			const songs = action.songs;
			newState = { ...state };
			songs.songs.forEach((song) => {
				newState[song.id] = song;
			});
			return newState;
		case GET_SONG:
			return { ...state, [action.song.id]: action.song };
		case ADD_SONG:
			return { ...state, [action.song.id]: action.song };
		default:
			return state;
	}
};

export default songReducer
