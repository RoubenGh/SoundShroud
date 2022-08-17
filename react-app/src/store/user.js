export const GET_USERS = '/api/users';
export const GET_USER = '/api/users/:id';

const getUsers = (users) => ({
	type: GET_USERS,
	users,
});

const getUser = (user) => ({
	type: GET_USER,
	user,
});

export const getAllUsers = () => async (dispatch) => {
	const response = await fetch('/api/users');
	if (response.ok) {
		const users = await response.json();
		dispatch(getUsers(users));
	}
};

//GET SINGLE USER
export const getSingleUser = (id) => async (dispatch) => {
	const response = await fetch(`/api/users/${id}`);
	if (response.ok) {
		const user = await response.json();
		dispatch(getUser(user));
		return user;
	}
};

//REDUCER

const initialState = {};

export default function userReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_USERS:
			const users = action.users;
			newState = { ...state };
			users.users.forEach((user) => {
				newState[user.id] = user;
			});
			return newState;
		case GET_USER:
			return { [action.user.id]: action.user };
		default:
			return state;
	}
}
