import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import { getWorkouts, deleteWorkout } from '../../actions/workout';
import formatDate from '../../utils/formatDate';
import { setAuthToken } from '../../store';

import Spinner from '../layout/Spinner';

const Workouts = ({
  auth: { user },
  workout: { workouts, workout, loading },
  loadUser,
  getWorkouts,
  deleteWorkout,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    getWorkouts();
  }, [getWorkouts, workout]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {user && user.name && workouts && workouts.length > 0
        ? (
          <>
            <h2 className="large text-primary text-center">Here's Your Workout List</h2>
            <div className="text-center">
              <Link to="/create-workout" className="btn btn-primary">Create New Workout</Link>
            </div>
          </>
        )
        : (
          <>
            <p className="my-1 text-center">No workouts yet? <Link to="/create-workout">Create One Here</Link></p>
          </>
        )}
      {workouts && workouts.map((workout, index) => (
        <Fragment key={index}>
          <div className="workout">
            <h2 className="large text-primary center-on-small">{workout.title}</h2>
            <p className="text-primary center-on-small">{formatDate(workout.date)}</p>
            <div className="workout-grid">
              {workout.exercises.map((exercise, index) => {
                const {
                  name, bodypart, reps, sets, weight, comment,
                } = exercise;
                return (
                  <Fragment key={index}>
                    <div className="workout-item">
                      {/* <h3 className="text-primary">Exercise {index + 1}:</h3> */}
                      <h2>{name.toUpperCase()}</h2>
                      <h3><span className="text-third">Bodypart</span> - {bodypart}</h3>
                      <h3><span className="text-third">Sets</span> - {sets}</h3>
                      <h3><span className="text-third">Reps</span> - {reps}</h3>
                      <h3><span className="text-third">Weight</span> - {weight}</h3>
                      <h3><span className="text-third">Comment</span> - {comment}</h3>
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <div className="buttons">
              <Link to={`/edit-workout/${workout._id}`} className="btn btn-primary">Edit</Link>
              <div className="btn btn-danger" onClick={() => deleteWorkout(workout._id)}>
                <i className="fas fa-times" />
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

Workouts.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getWorkouts: PropTypes.func.isRequired,
  workout: PropTypes.object.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  workout: state.workout,
});

export default connect(mapStateToProps,
  {
    loadUser, getWorkouts, deleteWorkout,
  })(withRouter(Workouts));
