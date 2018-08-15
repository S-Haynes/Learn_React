import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  ADD_LIKE,
  DELETE_LIKE,
  GET_POST,
  CLEAR_ERRORS
} from "./actiontypes";

// Create Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete("/api/posts/" + id)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get all posts
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts/" + id)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: null
      });
    });
};

// Get Post
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

// Add Like
export const addLike = (id, userId) => dispatch => {
  axios
    .post("/api/posts/like/" + id)
    .then(res =>
      dispatch({
        type: ADD_LIKE,
        payload: id,
        userId: userId
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

// Delete Like
export const deleteLike = (id, userId) => dispatch => {
  axios
    .delete("/api/posts/unlike/" + id)
    .then(res =>
      dispatch({
        type: DELETE_LIKE,
        payload: id,
        userId: userId
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

// Add comment to post
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts/comment/" + postId, commentData)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete comment from post
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete("/api/posts/comment/" + postId + "/" + commentId)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
