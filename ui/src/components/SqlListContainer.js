import { connect } from 'react-redux'
// import { fetchPosts } from '../store/actions/index'
import SqlList from './SqlList'

// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case 'SHOW_COMPLETED':
//       return todos.filter(t => t.completed)
//     case 'SHOW_ACTIVE':
//       return todos.filter(t => !t.completed)
//     case 'SHOW_ALL':
//     default:
//       return todos
//   }
// }

const mapStateToProps = state => ({
  billow: state // getVisibleTodos(state.todos, state.visibilityFilter)
})

// const mapDispatchToProps = dispatch => ({
//   toggleTodo: id => dispatch(toggleTodo(id))
// })

export default connect(
  mapStateToProps //,
  // mapDispatchToProps
)(SqlList)
