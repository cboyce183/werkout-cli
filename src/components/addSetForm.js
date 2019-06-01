import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { Mutation } from "react-apollo";

const IntegrationDownshift = require('./integrationDownshift.js').IntegrationDownshift;
const queries = require("../graphql/queries").default;

const moment = require('moment');

function getLocalDate() {
  return moment().format('L');
};


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

function AddBtn() {
  const classes = useStyles();

  return (
    <Fab color="primary" aria-label="Add" className={classes.fab} type="submit">
      Add
    </Fab>
  );
}

export function AddSetForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    reps: '',
    weight: ''
  });

  const handleChange = name => event => {
    const value = event.target ? +event.target.value : event;
    setValues({ ...values, [name]: value });
  };

  return (
    <Mutation mutation={queries.ADD_SET} update={(cache, { data: { addSet }}) => {
      const {sets} = cache.readQuery({query: queries.GET_SETS});
      addSet.exercise = props.exercises.find(el => el.id === addSet.exId);
      delete addSet.exId;
      cache.writeQuery({
          query: queries.GET_SETS,
          data: { sets: sets.concat([addSet]) },
        });
    }}>
      {(addSet, { data }) => (
        <form className={classes.container} onSubmit={e => {
          e.preventDefault();
          addSet({ variables: {
            date: getLocalDate(),
            exId: props.exercises.find(e => e.name === values.name).id,
            reps: values.reps || 0,
            weight: values.weight || 0
            }
          });
          values.name = "";
          values.reps = "";
          values.weight = "";
        }}>
        <div className={classes.textField}>
          <IntegrationDownshift
            exercises={props.exercises}
            id="standard-name"
            label="Exercise"
            value={values.name}
            onChange={handleChange('name')}
            />
        </div>
        <TextField
          id="standard-number"
          label="Reps"
          value={values.reps}
          onChange={handleChange('reps')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="standard-number"
          label="Weight"
          value={values.weight}
          onChange={handleChange('weight')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <AddBtn type="submit"/>
      </form>
      )}
    </Mutation>
  );
}