import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Button, Row, Col, Typography } from 'antd'
import { getPosts } from '../actions/postsActions'
import UISpinner from '../components/UISpinner'

const { Title, Paragraph, Text } = Typography

const Post = props => {
  const [post, setPost] = useState({})
  const dispatch = useDispatch()
  const { posts, loading } = useSelector(({ postsReducer }) => postsReducer)

  useEffect(() => {
    if (!posts.length) dispatch(getPosts())
    const post = posts.find(post => post.id === Number(props.match.params.id))
    setPost(post)
    // eslint-disable-next-line
  }, [posts])
  return loading ? (
    <UISpinner />
  ) : (
    <Row style={{ justifyContent: 'center' }}>
      <Col xs={24} sm={24} md={18} lg={18} style={{ textAlign: 'center' }}>
        <Link to='/' style={{ position: 'absolute', top: -40, left: 0 }}>
          <Button>Go Back</Button>
        </Link>
        <Title style={{ margin: 0 }}>{post?.title}</Title>
        <Paragraph className='center-flex'>
          <Text type='secondary'>Autor: {post?.userId}</Text>
          <Avatar src={`https://robohash.org/${post?.id}`} />
        </Paragraph>
        <img
          alt='Post'
          src={`https://picsum.photos/500/300?random=${post?.id}`}
        />
        <Paragraph
          style={{ paddingTop: 30, paddingBottom: 30, textAlign: 'left' }}
        >
          {post?.body}
        </Paragraph>
      </Col>
    </Row>
  )
}

export default Post
