import { Layout, PageHeader } from 'antd'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Home from './pages/Home'
import Post from './pages/Post'

const history = createBrowserHistory()
const { Content } = Layout

const App = () => (
  <Layout>
    <PageHeader className='site-page-header' backIcon={false} title='Blog' />
    <Content style={{ padding: 30 }}>
      <Router history={history}>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/post/:id'} component={Post} />
        </Switch>
      </Router>
    </Content>
  </Layout>
)

export default App
