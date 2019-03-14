import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { fetchPosts, fetchPostsDirect } from '../store/actions/index'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const _ = require('lodash')

const styles = {
  card: {
    width: 300,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class SqlList extends Component {

  render() {
    const { classes } = this.props;

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
            <Button
              key={index}
              variant="contained" 
              color="primary"
              onClick={() => this.props.globalState.isEnabled ? this.props.submitRequestDirect('tables', databaseName) : this.props.submitRequest('tables', databaseName) }
            >
              {databaseName}
            </Button>
          )
        }
      )
    }

    if (queryTables) {
      const headers = _.keys(queryTables.mappedFields)

      const tableHeaders = (
        <TableHead>
          <TableRow>
            {
              _.map(
                headers,
                (value, index) => {
                  return (
                    <TableCell key={index}>
                      {value}
                    </TableCell>
                  )
                }
              )
            }
          </TableRow>
        </TableHead>
      )

      const tableRows = (
        <TableBody>
          {
            _.map(
              queryTables.values,
              (value, index) => {
                return (
                  <TableRow key={index}>
                    {
                      _.map(
                        headers,
                        (item, index) => {
                          return (
                            <TableCell key={index}>
                              { _.join(_.map(queryTables.mappedFields[item], n => value[n]), ' ') }
                            </TableCell>
                          )
                        }
                      )
                    }
                  </TableRow>
                )
              }
            )
          }
        </TableBody>
      )

      table = (
        <Table>
          {tableHeaders}
          {tableRows}
        </Table>
      )

      // let image = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg'

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
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          Table
                        </Typography>
                        <Typography variant="h5" component="h2">
                          { _.join(_.map(queryTables.mappedFields['name'], n => queryTableValue[n]), ' ') }
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          Columns
                        </Typography>
                        <Typography component="p">
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
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
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
  globalState: PropTypes.object,
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => ({
  submitRequest: (name, parent) => dispatch(fetchPosts(name, parent)),
  submitRequestDirect: (name, parent) => dispatch(fetchPostsDirect(name, parent))
})

export default withStyles(styles)(connect(
  null,
  mapDispatchToProps
)(SqlList))
