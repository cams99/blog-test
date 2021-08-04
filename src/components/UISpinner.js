import PropTypes from 'prop-types'
import { Spin } from 'antd'

const UISpinner = props => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spin size={props.size} />
    <span>{props.title}</span>
  </div>
)

UISpinner.defaultProps = {
  size: 'large',
  title: 'Loading',
}

UISpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'default', 'large']),
  title: PropTypes.string,
}

export default UISpinner
