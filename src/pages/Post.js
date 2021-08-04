import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Avatar,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Comment,
  message,
} from 'antd'
import { getPosts, addComment } from '../actions/postsActions'
import UISpinner from '../components/UISpinner'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input
const { Item } = Form

const Post = props => {
  const [post, setPost] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const { posts, loading, commentLoading, commentError } = useSelector(
    ({ postsReducer }) => postsReducer
  )

  useEffect(() => {
    if (!posts.length) dispatch(getPosts())
    const post = posts.find(post => post.id === Number(props.match.params.id))
    setPost(post)
    // eslint-disable-next-line
  }, [posts])

  useEffect(() => {
    if (commentError) message.error(commentError)
  }, [commentError])

  const onSubmit = () => {
    if (
      [name, email, comment].includes('') ||
      [name, email, comment].includes(null)
    ) {
      return message.warning('All fields are required')
    } else if (typeof email !== 'undefined') {
      let posicionArroba = email.lastIndexOf('@')
      let posicionPunto = email.lastIndexOf('.')
      if (
        !(
          posicionArroba < posicionPunto &&
          posicionArroba > 0 &&
          email.indexOf('@@') === -1 &&
          posicionPunto > 2 &&
          email.length - posicionPunto > 2
        )
      ) {
        return message.warning('Email is not valid')
      }
    }
    const data = {
      name,
      email,
      comment,
    }
    dispatch(addComment(post.id, data))
    setName('')
    setEmail('')
    setComment('')
  }

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
        <Title level={4} style={{ textAlign: 'left' }}>
          Comments
        </Title>
        {post?.comments &&
          post.comments.map((comment, i) => (
            <Comment
              key={i}
              author={`${comment.name} | ${comment.email}`}
              avatar={
                <Avatar src={`https://robohash.org/${i}?set=set3`} alt='User' />
              }
              content={<p style={{ textAlign: 'left' }}>{comment.comment}</p>}
            />
          ))}
        <Form>
          <Title level={5} style={{ textAlign: 'left' }}>
            New comment
          </Title>
          <Row gutter={25}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Item>
                <Input
                  onChange={e => setName(e.target.value)}
                  value={name}
                  placeholder='Name'
                />
              </Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Item>
                <Input
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  placeholder='Email'
                />
              </Item>
            </Col>
          </Row>
          <Item>
            <TextArea
              rows={4}
              onChange={e => setComment(e.target.value)}
              value={comment}
              placeholder='Comment'
            />
          </Item>
          <Item style={{ textAlign: 'right' }}>
            <Button
              htmlType='submit'
              loading={commentLoading}
              onClick={onSubmit}
              type='primary'
            >
              Add Comment
            </Button>
          </Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Post
