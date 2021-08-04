import { ERROR, GET_POSTS, LOADING } from '../types/postsTypes'

const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: '',
}

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false, error: '' }

    case LOADING:
      return { ...state, loading: true, error: '' }

    case ERROR:
      return { ...state, error: action.payload, loading: false }

    default:
      return state
  }
}

export default usersReducer
