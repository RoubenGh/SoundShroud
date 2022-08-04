export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

const getComments = (comments) => ({
	type: GET_COMMENTS,
	comments,
});

const addComment = (comment) => ({
	type: ADD_COMMENT,
	comment,
});

const deleteComment = (comment) => ({
	type: DELETE_COMMENT,
	comment,
});

const editComment = (comment) => ({
	type: EDIT_COMMENT,
	comment,
});

export const getCommentsBySongId = (song_id) => async (dispatch) => {
	const response = await fetch(`/api/songs/${song_id}/comments`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getComments(data));
		return data;
	}
};

export const addCommentBySongId = (data) => async (dispatch) => {
	const { user_id, song_id, content, username } = data;

	const form = new FormData();
	form.append('user_id', user_id);
	form.append('song_id', song_id);
	form.append('content', content);
	form.append('username', username);

	const response = await fetch(`/api/songs/${song_id}`, {
		method: 'POST',
		body: form,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addComment(data));
		return data;
	}
};


