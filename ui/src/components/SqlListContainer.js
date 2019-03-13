import { connect } from 'react-redux'

import SqlList from './SqlList'

const mapStateToProps = state => ({
  globalState: state
})

export default connect(
  mapStateToProps
)(SqlList)
