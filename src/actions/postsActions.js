import axios from 'axios'
import { ERROR, GET_POSTS, LOADING } from '../types/postsTypes'

export const getPosts = () => async dispatch => {
  dispatch({
    type: LOADING,
  })
  try {
    const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
    dispatch({
      type: GET_POSTS,
      payload: posts.data,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR,
      payload: 'No se han podido cargar los posts',
    })
  }
}
