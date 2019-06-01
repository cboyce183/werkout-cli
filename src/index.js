import React from 'react';
import './index.css';
import { render } from "react-dom";

import { ApolloProvider } from "react-apollo";

import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import { groupBy } from "lodash";
import AppBar from "./components/bottomBar.js";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const AddSetForm = require("./components/addSetForm.js").AddSetForm;
const queries = require("./graphql/queries").default;

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const AddForm = () => (
  <Query
    query={queries.GET_EXERCISES}
  >
  {({loading, error, data}) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Looks like the servers having some issues fetching the exercises...</p>;
    return (<AddSetForm exercises={data.exercises}/>);
  }}
  </Query>
);

const SetsList = () => (
  <div style={{display: 'flex', flexDirection: 'column-reverse', overflow: 'scroll'}}>
    <Query
      query={queries.GET_SETS}
      id="setslist"
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Looks like the servers having some issues :(</p>;

        const byDate = Object.entries(groupBy(data.sets, i => i.date));
        console.log(byDate)

        return byDate.map(el => {
          const [date, set] = el;
          const byExercise = Object.entries(groupBy(set, i => i.exercise.name));

          return (
            <div key={date}>
            <Typography
              component="span"
              variant="h5"
              style={{display: 'inline'}}
              color="textPrimary"
            >
              - {date} -
            </Typography>
              {
                byExercise.map(exercise => {
                  const [name, data] = exercise;
                  return (
                    <div>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                style={{display: 'inline'}}
                                color="textPrimary"
                              >
                                {
                                  data.map((set, index) => {
                                   return (
                                    <p>{set.reps} reps / {set.weight}kg</p>
                                   );
                                 })
                                }
                              </Typography>
                           </React.Fragment>
                          }
                        />
                      </ListItem>

                    </div>
                  );
                })
              }
            </div>
          )
        });
      }}
    </Query>
  </div>
);

const App = () => (
  <ApolloProvider client={client}>
    <div style={{paddingBottom: '35px'}}>
      <SetsList/>
      <AppBar/>
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));