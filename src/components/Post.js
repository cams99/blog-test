import { Card, Avatar, Col } from 'antd'

const { Meta } = Card

const Post = ({ data }) => (
  <Col xs={12} sm={12} md={8} lg={8} style={{ paddingBottom: 30 }}>
    <Card
      cover={
        <img
          alt='example'
          src={`https://picsum.photos/500/300?random=${data.title}`}
        />
      }
    >
      <Meta
        avatar={<Avatar src={`https://robohash.org/${data.title}`} />}
        title={data.title}
        description={`${data.body.substr(0, 70)}...`}
      />
    </Card>
  </Col>
)

export default Post
