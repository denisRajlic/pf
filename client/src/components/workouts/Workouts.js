import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import { getWorkouts } from '../../actions/workout';
import Spinner from '../layout/Spinner';

const Workouts = ({
  match, auth: { user }, workout: { workouts, loading }, loadUser, getWorkouts,
}) => {
  useEffect(() => {
    loadUser();
    getWorkouts(match.params.id);
  }, [loadUser, getWorkouts, match]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1>Hello{' '}{user && user.name}!</h1>
      {workouts.length > 0
        ? (<h2>Here Are Your Workouts!</h2>)
        : (<h2>No Workouts Yet...Create Your First One Now!</h2>)}
      <Link to="/create-workout" className="btn btn-primary">Create New Workout</Link>
      {
        workouts.map((workout, index) => (
          <Fragment key={index}>
            <div className="profiles">
              <h2 className="text-primary">{workout.title}</h2>
              {workout.exercises.map((exercise, index) => {
                const {
                  name, bodypart, reps, sets, weight, comment,
                } = exercise;
                return (
                  <Fragment key={index}>
                    <h3 className="text-primary">Exercise {index + 1}:</h3>
                    <h4>Name: {name}</h4>
                    <h4>Bodypart: {bodypart}</h4>
                    <h4>Sets: {sets}</h4>
                    <h4>Reps: {reps}</h4>
                    <h4>Weight: {weight}</h4>
                    <h4>Comment: {comment}</h4>
                  </Fragment>
                );
              })}
            </div>
          </Fragment>
        ))
      }
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
