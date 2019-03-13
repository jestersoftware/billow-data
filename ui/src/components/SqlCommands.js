import React, { Component } from 'react'

import { connect } from 'react-redux'

import { fetchPosts, fetchPostsDirect, toggleDirect } from '../store/actions/index'

import Button from '@material/react-button'

import { Checkbox } from "@blueprintjs/core"

class SqlCommands extends Component {

  render() {
    return (
      <div className='flex-container App-buttons'>
        <div className='App-button'>
          <Button
            raised
            className='button-alternate'
            onClick={() => this.props.globalState.isEnabled ? this.props.submitRequestDirect('databases', '') : this.props.submitRequest('databases', '')}
          >
            Submit Request
          </Button>
        </div>
        <div className='App-button'>
          <Checkbox checked={this.props.globalState.isEnabled} label="Enabled" onChange={this.props.toggleDirect} />
        </div>
        <div>
          Request: {this.props.globalState.status || ''}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  globalState: state
})

const mapDispatchToProps = dispatch => ({
  toggleDirect: () => dispatch(toggleDirect()),
  submitRequest: (name, parent) => dispatch(fetchPosts(name, parent)),
  submitRequestDirect: (name, parent) => dispatch(fetchPostsDirect(name, parent))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SqlCommands)
