import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Frame, Table, Button } from 'arwes'

import Api, { DataContext } from '../api/Api'

// import datasetCollectionMock from './SqlListMock'

const _ = require('lodash')

// export default function SelectedFoods(props) {
class SqlList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tablesResponse: null //,
      // headers:
      //   [
      //     'Prop name',
      //     'Type',
      //     'Default',
      //     'Description'
      //   ],
      // dataset:
      //   [
      //     ['name', 'string', '\'\'', 'The base name of the component'],
      //     ['age', 'number', '0', 'The age of the component'],
      //     ['married', 'bool', 'false', 'If the component is married'],
      //   ]
    }
  }

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

  submitRequest = (databaseId) => {
    Api.submitRequest(
      'tables',
      databaseId,
      response => {
        this.setState(
          {
            tablesResponse: response
          }
        )
      }
    )
  }

  render() {
    // console.log('props', this.props)
    console.log('SqlList render')


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

    const queryFirst = billow.queries[0]


    const databaseButtons = _.map(
      queryFirst.values,
      value => {
        // console.log('key', value.name)

        return (
          <Button
            key={value.name}
            animate
            onClick={() => this.submitRequest(value.name)}
          >
            {value.name}
          </Button>
        )
      }
    )


    let headers = queryFirst.fields // this.state.headers

    let dataset = _.map(queryFirst.values, value => _.values(value)) // this.state.dataset

    // console.log('dataset', dataset)

    if (this.state.tablesResponse) {
      // console.log('aaa')

      const queryTables = this.state.tablesResponse.queries[0]

      headers = queryTables.fields // this.state.headers

      dataset = _.map(queryTables.values, value => _.values(value)) // this.state.dataset

      return (
        <div>
          {databaseButtons}
          <Frame
            animate={true}
            level={3}
            corners={4}
            layer='primary'
          >
            <div style={{ padding: 20 }}>
              <Table
                animate
                headers={headers}
                dataset={dataset}
              />
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
          </Frame>
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

export default SqlList