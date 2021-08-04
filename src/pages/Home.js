import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../actions/postsActions'
import { Row, message } from 'antd'
import Post from '../components/Post'
import UISpinner from '../components/UISpinner'

const Home = () => {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector(
    ({ postsReducer }) => postsReducer
  )

  useEffect(() => {
    dispatch(getPosts())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (error) message.error(error)
  }, [error])

  return loading ? (
    <UISpinner />
  ) : (
    <Row gutter={30}>
      {posts.map((post, i) => (
        <Post key={i} data={post} />
      ))}
    </Row>
  )
}

export default Home
