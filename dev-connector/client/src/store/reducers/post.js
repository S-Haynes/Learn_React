import {
  ADD_POST,
  POST_LOADING,
  GET_POSTS,
  DELETE_POST,
  ADD_LIKE,
  DELETE_LIKE,
  GET_POST
} from "../actions/actiontypes";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts]
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case ADD_LIKE:
      const postIndex = state.posts.findIndex(
        post => post._id === action.payload
      );

      const currentPostToLike = { ...state.posts[postIndex] };
      const updatedLikes = currentPostToLike.likes.concat({
        user: action.userId
      });

      return {
        ...state,
        posts: [
          ...state.posts.slice(0, postIndex),
          {
            ...state.posts[postIndex],
            likes: updatedLikes
          },
          ...state.posts.slice(postIndex + 1)
        ]
      };

    case DELETE_LIKE:
      const deletePostIndex = state.posts.findIndex(
        post => post._id === action.payload
      );

      const currentPost = { ...state.posts[deletePostIndex] };
      const newLikes = currentPost.likes.splice(1);

      return {
        ...state,
        posts: [
          ...state.posts.slice(0, deletePostIndex),
          {
            ...state.posts[deletePostIndex],
            likes: newLikes
          },
          ...state.posts.slice(deletePostIndex + 1)
        ]
      };
    default:
      return state;
  }
};

export default reducer;
