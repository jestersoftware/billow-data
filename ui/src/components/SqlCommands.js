import React, { Component } from 'react'

import { connect } from 'react-redux'

import { fetchPosts, fetchPostsDirect, toggleDirect } from '../store/actions/index'

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'

class SqlCommands extends Component {

  render() {
    return (
      <div className='flex-container App-buttons'>
        <div className='App-button'>
          <Button
            variant="contained" 
            color="primary"
            onClick={() => this.props.globalState.isEnabled ? this.props.submitRequestDirect('databases', '') : this.props.submitRequest('databases', '')}
          >
            Submit Request
          </Button>
        </div>
        <div className='App-button'>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={this.props.globalState.isEnabled}
                  onChange={this.props.toggleDirect} 
                />  
              }
              label="Direct"
            />
          </FormGroup>
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
