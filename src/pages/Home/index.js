import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Topbar from '../../components/Topbar';
import AddTodo from '../../components/Todo/AddToDoForm';
import TodoList from '../../components/Todo/TodosList'

import LoadingOverlay from 'react-loading-overlay';

import api from '../../api'


const backgroundShape = require('../../assets/images/shape.svg');

const styles = theme => ({
  root: {

    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  }
});

class Main extends Component {

  state = {
    todos: [],
    loading: false
  }
  
  componentDidMount() {
    this.getTodos()
  }

  getTodos = () => {
    this.setState({ loading: true })
    api.get('/todos')
      .then(res => {
        this.setState({ todos: res.data, loading: false })
      })  
      .catch(err => {
        console.log(err)
      })
  }

  createTodo = (text) => {
    api.post('/todo', { text })
      .then(res => {
        this.getTodos()
      })  
      .catch(err => {
        console.log(err)
      })
  }

  handleUpdateTodo = (todo) => {
    api.put(`/todo/complete/${todo._id}`, todo)
      .then(res => {
        this.getTodos()
      })  
      .catch(err => {
        console.log(err)
      })
  };

  handleRemoveTodo = (todo) => {
    api.delete(`/todo/${todo._id}`)
      .then(res => {
        this.getTodos()
      })  
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12} md={8}>
                <LoadingOverlay
                  active={this.state.loading}
                  spinner
                  text='Loading todos...'
                >
                <Paper className={classes.paper}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                      Todo List
                    </Typography>
                    <AddTodo createTodo={this.createTodo}/>
                    <TodoList 
                      todos={this.state.todos} 
                      handleUpdateTodo={this.handleUpdateTodo}
                      handleRemoveTodo={this.handleRemoveTodo}
                    />
                </Paper>
                </LoadingOverlay>
              </Grid>
            </Grid>
          </Grid>
 
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Main));
