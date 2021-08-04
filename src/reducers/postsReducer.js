import {
  ERROR,
  GET_POSTS,
  LOADING,
  ADD_COMMENT,
  COMMENT_LOADING,
  COMMENT_ERROR,
} from '../types/postsTypes'

const INITIAL_STATE = {
  posts: [],
  loading: false,
  commentLoading: false,
  error: '',
  commentError: '',
}

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false, error: '' }

    case ADD_COMMENT:
      return {
        ...state,
        posts: action.payload,
        commentLoading: false,
        commentError: '',
      }

    case LOADING:
      return { ...state, loading: true, error: '' }

    case COMMENT_LOADING:
      return { ...state, commentLoading: true, commentError: '' }

    case ERROR:
      return { ...state, error: action.payload, loading: false }

    case COMMENT_ERROR:
      return { ...state, commentError: action.payload, commentLoading: false }

    default:
      return state
  }
}

export default usersReducer
