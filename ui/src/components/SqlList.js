import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { fetchPosts } from '../store/actions/index'

// import Api, { DataContext } from '../api/Api'

// import datasetCollectionMock from './SqlListMock'

import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card"
import Button from '@material/react-button'
import IconButton from '@material/react-icon-button'
import MaterialIcon from '@material/react-material-icon'
import {
  Body1,
  Body2,
  Caption,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Overline,
  Subtitle1,
  Subtitle2,
} from '@material/react-typography';

const _ = require('lodash')

// export default function SelectedFoods(props) {
class SqlList extends Component {
  // constructor(props) {
  //   super(props)

  //   // this.state = {
  //   //   // tablesResponse: null //,
  //   //   databases: null,
  //   //   tables: null
  //   //   // headers:
  //   //   //   [
  //   //   //     'Prop name',
  //   //   //     'Type',
  //   //   //     'Default',
  //   //   //     'Description'
  //   //   //   ],
  //   //   // dataset:
  //   //   //   [
  //   //   //     ['name', 'string', '\'\'', 'The base name of the component'],
  //   //   //     ['age', 'number', '0', 'The age of the component'],
  //   //   //     ['married', 'bool', 'false', 'If the component is married'],
  //   //   //   ]
  //   // }
  // }

  // state = {
  //   sql: [],
  //   request: ''
  // }

  // const { foods } = props


  // const foodRows = foods.map((food, idx) => (
  //   <tr key={idx} onClick={() => props.onFoodClick(idx)}>
  //     <td>{food.name || food.NAME}</td>
  //     <td className="right aligned">{food.COMMENT}</td>
  //     <td className="right aligned">{food.PHONE}</td>
  //     <td className="right aligned">{food.CONTACT_NAME}</td>
  //   </tr>
  // ))

  // submitRequest = (databaseId) => {
  //   Api.submitRequest(
  //     'tables',
  //     databaseId,
  //     response => {
  //       this.setState(
  //         {
  //           tablesResponse: response
  //         }
  //       )
  //     }
  //   )
  // }

  render() {
    // console.log('props', this.props)
    // console.log('SqlList render')


    // return (
    //   <DataContext.Consumer>
    //     {
    //       value => {
    //         // let { billow } = this.props

    //         const queryFirst = value.queries[0]

    //         return _.map(
    //           queryFirst.values,
    //           value1 => {
    //             // console.log('key', value.name)

    //             return (
    //               <Button
    //                 key={value1.name}
    //                 animate
    //                 onClick={() => this.submitRequest(value1.name)}
    //               >
    //                 {value1.name}
    //               </Button>
    //             )
    //           }
    //         )

    //       }
    //     }
    //   </DataContext.Consumer>
    // )




    let { billow } = this.props

    const queryDatabases = billow.queries.find(q => q.name === 'databases' || q.name === '')

    const queryTables = billow.queries.find(q => q.name === 'tables')

    const databaseButtons = _.map(
      queryDatabases.values,
      (value, index) => {
        return (
          <button
            key={index}
            onClick={() => this.props.submitRequest('tables', value.name)}
          >
            {value.name}
          </button>
        )
      }
    )

    if (queryTables) {
      const headers = queryTables.fields

      const dataset = _.map(queryTables.values, value => _.values(value))

      const tableHeaders = (
        <thead>
          <tr>
            {
              _.map(
                headers,
                (value, index) => {
                  return (
                    <th key={index}>
                      {value}
                    </th>
                  )
                }
              )
            }
          </tr>
        </thead>
      )

      const tableRows = (
        <tbody>
          {
            _.map(
              dataset,
              value => {
                return (
                  <tr key={value}>
                    {
                      _.map(
                        value,
                        (item, index) => {
                          return (
                            <td key={index}>
                              {item}
                            </td>
                          )
                        }
                      )
                    }
                  </tr>
                )
              }
            )
          }
        </tbody>
      )

      const table = (
        <table>
          {tableHeaders}
          {tableRows}
        </table>
      )

      let image = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg'

      const list = (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {
            _.map(
              dataset,
              (value, rowIndex) => {
                return (
                  <div
                    key={rowIndex}
                    style={{ margin: '5px' }}
                  >
                    <Card className='demo-card demo-ui-control'>
                      <CardPrimaryContent className='demo-card__primary-action'>
                        <CardMedia square imageUrl={image} className='demo-card__media' />
                        <div className='demo-card__primary'>
                          <Headline6 className='demo-card__title'>
                            {value[0]}
                          </Headline6>
                          <Subtitle2 className='demo-card__subtitle'>
                            {value[1]}
                          </Subtitle2>
                        </div>
                      </CardPrimaryContent>
                      <CardActions>
                        <CardActionButtons>
                          <Button>Read</Button>
                          <Button>Bookmark</Button>
                        </CardActionButtons>
                        <CardActionIcons>
                          <IconButton>
                            <MaterialIcon icon='favorite_border' />
                          </IconButton>
                          <IconButton>
                            <MaterialIcon icon='share' />
                          </IconButton>
                          <IconButton>
                            <MaterialIcon icon='more_vert' />
                          </IconButton>
                        </CardActionIcons>
                      </CardActions>
                    </Card>
                  </div>
                )
              }
            )
          }
        </div>
      )

      return (
        <div>
          {databaseButtons}
          <div>
            <div style={{ padding: 20 }}>
              {/* {table} */}
              {list}
            </div>

            {/* 
          <table className="ui selectable structured large table">
            <thead>
              <tr>
                <th colSpan="5">
                  <h3>SQL Clients</h3>
                </th>
              </tr>
              <tr>
                <th className="eight wide">Name</th>
                <th>Comment</th>
                <th>Phone</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {foodRows}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th className="right aligned" id="total-kcal">
                  {sum(foods, "kcal")}
                </th>
                <th className="right aligned" id="total-protein_g">
                  {sum(foods, "protein_g")}
                </th>
                <th className="right aligned" id="total-fat_g">
                  {sum(foods, "fat_g")}
                </th>
              </tr>
            </tfoot>
          </table> 
          */}
          </div>
        </div>
      )
    }
    else {
      return databaseButtons
    }
  }
}

SqlList.propTypes = {
  billow: PropTypes.object
}

// function sum(foods, prop) {
//   return foods
//     .reduce((memo, food) => parseInt(food[prop], 10) + memo, 0.0)
//     .toFixed(2)
// }

// export default SqlList

// const mapStateToProps = state => ({
//   billow: state // getVisibleTodos(state.todos, state.visibilityFilter)
// })

const mapDispatchToProps = dispatch => ({
  submitRequest: (name, parent) => dispatch(fetchPosts(name, parent))
})

export default connect(
  null,
  mapDispatchToProps
)(SqlList)
