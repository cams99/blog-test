import { Card, Avatar, Col } from 'antd'
import { Link } from 'react-router-dom'

const { Meta } = Card

const PostCard = ({ data }) => (
  <Col xs={12} sm={12} md={8} lg={8} style={{ paddingBottom: 30 }}>
    <Link to={`/post/${data.id}`}>
      <Card
        cover={
          <img
            alt='Post'
            src={`https://picsum.photos/500/300?random=${data.id}`}
          />
        }
      >
        <Meta
          avatar={<Avatar src={`https://robohash.org/${data.id}`} />}
          title={data.title}
          description={`${data.body.substr(0, 70)}...`}
        />
      </Card>
    </Link>
  </Col>
)

export default PostCard
