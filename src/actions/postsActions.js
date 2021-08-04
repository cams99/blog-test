import axios from 'axios'
import {
  ERROR,
  GET_POSTS,
  LOADING,
  ADD_COMMENT,
  COMMENT_LOADING,
  COMMENT_ERROR,
} from '../types/postsTypes'

export const getPosts = () => async dispatch => {
  dispatch({
    type: LOADING,
  })
  try {
    const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
    dispatch({
      type: GET_POSTS,
      payload: posts.data.map(post => ({ ...post, comments: [] })),
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR,
      payload: 'No se han podido cargar los posts',
    })
  }
}

export const addComment = (postId, comment) => async (dispatch, getState) => {
  dispatch({
    type: COMMENT_LOADING,
  })
  try {
    const { postsReducer } = getState()
    const posts = postsReducer.posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    )
    dispatch({
      type: ADD_COMMENT,
      payload: posts,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: COMMENT_ERROR,
      payload: 'No se han podido guardar el comentario',
    })
  }
}
