export const GET_SINGLECOMMENT = 'GET_SINGLECOMMENT';

const getSingleComment = (comment) => ({
    type: GET_SINGLECOMMENT,
    comment,
});

export const getSingleCommentBySongId = (id, comment_id) => async (dispatch) => {
    const response = await fetch(`/api/songs/${id}/comments/${comment_id}`);
    console.log(comment_id, '-0000000000asdddddddddd')
    if (response.ok) {
        const data = await response.json();
        dispatch(getSingleComment(data));
        return data;
    }
}

const initialState = {};

const singleCommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SINGLECOMMENT:
            return { state, [action.comment.id]: action.comment };
        default:
            return state;
    }
}

export default singleCommentReducer;
