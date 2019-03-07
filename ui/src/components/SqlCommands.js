import React, { Component } from 'react'

import { connect } from 'react-redux'

import { fetchPosts } from '../store/actions/index'

import Button from '@material/react-button';

class SqlCommands extends Component {

  submitRequestDirect = () => {
    //   this.setState(
    //     {
    //       databasesResponse: defaultResponse,
    //       requestStatus: 'sending request directly',
    //       isVisible: false
    //     }
    //   )

    //   Api.submitRequestDirect(
    //     'databases',
    //     '',
    //     response => {
    //       this.setState(
    //         {
    //           databasesResponse: response,
    //           requestStatus: 'successful response from direct request',
    //           isVisible: true
    //         }
    //       )
    //     }
    //   )
  }

  // submitRequest = () => {
  //   this.setState(
  //     {
  //       databasesResponse: defaultResponse,
  //       requestStatus: 'sending request by proxy',
  //       isVisible: false
  //     }
  //   )

  //   Api.submitRequest(
  //     'databases',
  //     '',
  //     response => {
  //       this.setState(
  //         {
  //           databasesResponse: response, //.recordset.slice(0, MATCHING_ITEM_LIMIT),
  //           requestStatus: 'successful response from proxy request',
  //           isVisible: true
  //         }
  //       )
  //     }
  //   )
  // }


  render() {
    // console.log('sqlcommands', this.props)

    return (
      <div className='App-buttons'>
        <div className='App-button'>
          <Button
            raised
            className='button-alternate'
            onClick={() => this.props.submitRequest('databases', '')}
          >
            Submit Request
          </Button>
        </div>
        <div className='App-button'>
          <Button
            raised
            onClick={this.submitRequestDirect}
          >
            Agent Direct
          </Button>
        </div>
        <div>
          Request: {this.props.billow.requestStatus || ''}
        </div>
      </div>
    )
  }
}



const mapStateToProps = state => ({
  billow: state // getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  submitRequest: (name, parent) => dispatch(fetchPosts(name, parent))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SqlCommands)
