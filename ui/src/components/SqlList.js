import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { fetchPosts, fetchPostsDirect } from '../store/actions/index'

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
  /* 
  Body1,
  Body2,
  Caption,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5, 
  */
  Headline6,
  /* 
  Overline,
  Subtitle1, 
  */
  Subtitle2,
} from '@material/react-typography';

const _ = require('lodash')

// export default function SelectedFoods(props) {
class SqlList extends Component {

  render() {
    const queryDatabases = this.props.globalState.queries.find(q => q.name === 'databases')

    const queryTables = this.props.globalState.queries.find(q => q.name === 'tables')

    const queryColumns = this.props.globalState.queries.find(q => q.name === 'columns')

    let databaseButtons = null
    let table = null
    let list = null

    if (queryDatabases) {
      databaseButtons = _.map(
        queryDatabases.values,
        (value, index) => {
          const databaseName = _.join(_.map(queryDatabases.mappedFields.name, n => value[n]), ' ')

          return (
            <button
              key={index}
              onClick={() => this.props.globalState.isEnabled ? this.props.submitRequestDirect('tables', databaseName) : this.props.submitRequest('tables', databaseName) }
            >
              {databaseName}
            </button>
          )
        }
      )
    }

    if (queryTables) {
      const headers = _.keys(queryTables.mappedFields)

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
              queryTables.values,
              (value, index) => {
                return (
                  <tr key={index}>
                    {
                      _.map(
                        headers,
                        (item, index) => {
                          return (
                            <td key={index}>
                              { _.join(_.map(queryTables.mappedFields[item], n => value[n]), ' ') }
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

      table = (
        <table>
          {tableHeaders}
          {tableRows}
        </table>
      )

      let image = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg'

      list = (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {
            _.map(
              queryTables.values,
              (queryTableValue, index) => {
                return (
                  <div
                    key={index}
                    style={{ margin: '5px' }}
                  >
                    <Card className='demo-card demo-ui-control'>
                      <CardPrimaryContent className='demo-card__primary-action'>
                        <CardMedia square imageUrl={image} className='demo-card__media' />
                        <div className='demo-card__primary'>
                          <Headline6 className='demo-card__title'>
                            { _.join(_.map(queryTables.mappedFields['name'], n => queryTableValue[n]), ' ') }
                          </Headline6>
                          <Subtitle2 className='demo-card__subtitle'>
                            {
                              queryColumns ?
                                _.join(
                                  _.map(
                                    _.filter(
                                      queryColumns.values, 
                                      queryColumnValue => _.join(_.map(queryColumns.mappedFields['parentid'], n => queryColumnValue[n]), '') === _.join(_.map(queryTables.mappedFields['id'], n => queryTableValue[n]), ' ')
                                    ),
                                    queryColumnValue => _.join(_.map(queryColumns.mappedFields['name'], n => queryColumnValue[n]), ' ')
                                  )
                                )
                                : _.join(_.map(queryTables.mappedFields['id'], n => queryTableValue[n]), '')
                            }
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
    }

    return (
      <div>
        {databaseButtons}
        <div>
          <div style={{ padding: 20 }}>
            {table}
            {list}
          </div>
        </div>
      </div>
    )
  }
}

SqlList.propTypes = {
  globalState: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
  submitRequest: (name, parent) => dispatch(fetchPosts(name, parent)),
  submitRequestDirect: (name, parent) => dispatch(fetchPostsDirect(name, parent))
})

export default connect(
  null,
  mapDispatchToProps
)(SqlList)
