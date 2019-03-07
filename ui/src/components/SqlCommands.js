import React, { Component } from 'react'

import { connect } from 'react-redux'

import { fetchPosts } from '../store/actions/index'

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
    console.log('sqlcommands', this.props)

    return (
      <div className='App-buttons'>
        <div className='App-button'>
          <button onClick={() => this.props.submitRequest('databases')}>
            Submit Request
          </button>
        </div>
        <div className='App-button'>
          <button onClick={this.submitRequestDirect}>
            Agent Direct
          </button>
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
  submitRequest: name => dispatch(fetchPosts(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SqlCommands)
