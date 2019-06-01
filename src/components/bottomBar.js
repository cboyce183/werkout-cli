
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const AddSetForm = require("./addSetForm.js").AddSetForm;

const styles = theme => ({
  appBar0: {
    top: 'auto',
    bottom: 0,
    height: '35px',
    backgroundColor: 'white'
  },
  appBar1: {
    top: 'auto',
    bottom: 0,
    height: '263px',
    backgroundColor: 'white'
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    marginTop: '40px'
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

class BottomAppBar extends React.Component {
  state = {
    checked: false,
  };

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    const showForm = checked ? classes.appBar1 : classes.appBar0;

    return (
      <AppBar position="fixed" color="primary" className={showForm}>
          <FormControlLabel
            control={
              <Fab color="secondary" aria-label="Add" className={classes.fabButton} checked={checked} onClick={this.handleChange}>
                <AddIcon />
              </Fab>
            }
          />
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <Paper elevation={4} className={classes.paper}>
              <AddSetForm/>
            </Paper>
          </Slide>
      </AppBar>
    );
  } 
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);