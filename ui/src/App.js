import React, { Component } from 'react'

import posed/* , { PoseGroup } */ from 'react-pose'

// import logo from './logo.svg'
import './App.scss'

// import Api/* , {defaultResponse, DataContext} */ from './api/Api'

import SqlListContainer from './components/SqlListContainer'
import SqlCommands from './components/SqlCommands'

// import '@material/react-button/dist/button.css';
import { Cell, Grid, Row } from '@material/react-layout-grid';

// const MATCHING_ITEM_LIMIT = 25

// const mySounds = {
//   shared: { volume: 1, },  // Shared sound settings
//   players: {  // The player settings
//     click: {  // With the name the player is created
//       sound: { src: ['/sound/click.mp3'] }  // The settings to pass to Howler
//     },
//     typing: {
//       sound: { src: ['/sound/typing.mp3'] },
//       settings: { oneAtATime: true }  // The custom app settings
//     },
//     deploy: {
//       sound: { src: ['/sound/deploy.mp3'] },
//       settings: { oneAtATime: true }
//     },
//     information: {
//       sound: { src: ['/sound/information.mp3'] }
//     },
//     ask: {
//       sound: { src: ['/sound/ask.mp3'] }
//     },
//     warning: {
//       sound: { src: ['/sound/warning.mp3'] }
//     },
//     error: {
//       sound: { src: ['/sound/error.mp3'] }
//     }
//   }
// }

// const defaultResponse = {
//   status: "loading",
//   queries: [
//     {
//       count: 0,
//       query: "none",
//       fields: ["name"],
//       values: [{ name: "Loading..." }]
//     }
//   ]
// }

// const poseProps = {
//   visible: { opacity: 1, color: 'red' },
//   hidden: { opacity: 0.5, color: 'black' }
// }

// const Box = posed.div(poseProps)

const Box = posed.div({
  attention: {
    scale: 1.3,
    // transition: {
    //   type: 'spring',
    //   stiffness: 200,
    //   damping: 0
    // }
  },
  hidden: {
    opacity: 0.5, color: 'rgb(0,0,0)'
  }
})

// const DataContext = React.createContext(defaultResponse)

class App extends Component {
  // databasesResponse = defaultResponse

  state = {
    // databasesResponse: defaultResponse,
    // requestStatus: '',
    isVisible: false
  }

  componentDidMount() {
    // this.submitRequest()

    setTimeout(
      () => {
        this.setState(
          {
            isVisible: true
          }
        )
      },
      2000
    )

    setTimeout(
      () => {
        this.setState(
          {
            isVisible: false
          }
        )
      },
      4000
    )
  }

  // submitRequestDirect = () => {
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
  // }

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

  // submitRequestDirect = () => {
  //   Api.submitRequestDirect(
  //     'databases',
  //     '',
  //     response => {
  //       this.databasesResponse = response        
  //     }
  //   )
  // }

  // submitRequest = () => {
  //   Api.submitRequest(
  //     'databases',
  //     '',
  //     response => {
  //       this.databasesResponse = response        
  //     }
  //   )
  // }  

  render() {
    // console.log('App render')

    // className='App'
    return (
      <div className='flex-container vertical flex-child-auto'>
        <div className='flex-child-fixed'>
          <header className='App-header'>
            {/* <img src={logo} className='App-logo' alt='logo' /> */}
            <img src='/img/logo-invert.png' className='App-logo' alt='logo' />
            <span className='App-title'>Billow</span>
            <Box
              className="box"
              pose={this.state.isVisible ? 'attention' : 'hidden'}
            />
          </header>
        </div>
        <div className='flex-container horizontal flex-child-auto'>
          <div className='flex-container vertical flex-child-fixed left-menu-container'>
            <div className='flex-child-auto' style={{ backgroundColor: '#ddd' }}>
              Sidebar
            </div>
          </div>
          <div className='flex-container vertical flex-child-auto'>
            <div className='flex-child-fixed'>
              <SqlCommands />
            </div>
            <div className='flex-child-auto'>
              <div style={{ marginBottom: 20 }}>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis laboris nisi ut aliquip
                  ex. Duis aute irure. Consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud.
                </div>
              </div>
              {/* <SqlList
                            billow={this.state.databasesResponse}
                          /> */}
              {/* <DataContext.Provider value={this.databasesResponse}>
                          <SqlList />
                        </DataContext.Provider> */}
              <SqlListContainer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
