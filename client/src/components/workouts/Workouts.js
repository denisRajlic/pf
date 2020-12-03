import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import { getWorkouts } from '../../actions/workout';

const Workouts = ({
  match, auth: { user }, workout: { workouts, loading }, loadUser, getWorkouts,
}) => {
  useEffect(() => {
    loadUser();
    getWorkouts(match.params.id);
  }, [loadUser, getWorkouts, match]);

  return (
    <div>
      <h1>Hello{' '}{user && user.name},{' '}here are your workouts</h1>
      <Link to="/create-workout" className="btn btn-primary">Create New Workout</Link>
      {!loading && (
        workouts.map(workout => (
          <>
            <h3>Title: {workout.title}</h3>
            {workout.exercises.map(exercise => {
              const {
                name, bodypart, reps, sets, weight, comment,
              } = exercise;
              return (
                <>
                  <h4>Name: {name}</h4>
                  <h4>Bodypart: {bodypart}</h4>
                  <h4>Sets: {sets}</h4>
                  <h4>Reps: {reps}</h4>
                  <h4>Weight: {weight}</h4>
                  <h4>Comment: {comment}</h4>
                </>
              );
            })}
          </>
        ))
      )}
    </div>
  );
};

Workouts.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getWorkouts: PropTypes.func.isRequired,
  workout: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  workout: state.workout,
});

export default connect(mapStateToProps, { loadUser, getWorkouts })(Workouts);
