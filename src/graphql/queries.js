import {gql} from "apollo-boost";

export default {
  GET_SETS: gql`
    {
      sets {
        date
        exercise {
          id
          name
          type
          targets
        }
        reps
        weight
      }
    }`,

  GET_EXERCISES: gql`
  {
    exercises {
      id
      name
      type
      targets
    }
  }`,

  ADD_SET: gql`
  mutation addSet($date: String!, $exId: Int!, $reps: Int!, $weight: Int!) {
    addSet(
      date: $date
      exId: $exId
      reps: $reps
      weight: $weight
    ) {
      date
      exId
      reps
      weight
      }
    }`
};