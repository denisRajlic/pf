import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWorkout, createWorkout } from '../../actions/workout';
import { loadUser } from '../../actions/auth';
import setAlert from '../../actions/alert';
import { setAuthToken } from '../../store';

import Spinner from '../layout/Spinner';

const EditWorkout = ({
  match,
  workout: { workout, loading },
  getWorkout,
  createWorkout,
  setAlert,
  loadUser,
}) => {
  const [selectedEx, setSelectedEx] = useState(0);

  const [currentWorkout, setWorkout] = useState({
    title: '',
    isPublic: false,
  });

  const initialState = {
    name: '',
    bodypart: '',
    sets: '',
    reps: '',
    weight: '',
    comment: '',
  };

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    loadUser();
    getWorkout(match.params.id);
  }, [loadUser, getWorkout, match]);

  useEffect(() => {
    setWorkout({
      title: loading || !workout ? '' : workout.title,
      isPublic: loading || !workout ? false : workout.isPublic,
    });

    if (workout && workout.exercises) setExercises(workout.exercises);
  }, [loading, workout]);

  const { title, isPublic } = currentWorkout;

  const onSubmit = e => {
    e.preventDefault();
    const { _id } = workout;
    const edit = true;
    createWorkout({
      title, isPublic, exercises, _id, edit,
    });
  };

  const onPrevious = () => { if (selectedEx > 0) return setSelectedEx(selectedEx - 1); };

  const onNext = () => {
    if (selectedEx < exercises.length - 1) return setSelectedEx(selectedEx + 1);
  };

  const onChange = e => { setWorkout({ ...currentWorkout, [e.target.name]: e.target.value }); };

  const onExChange = e => {
    const copy = exercises.slice();
    copy[selectedEx][e.target.name] = e.target.value;
    setExercises(copy);
  };

  const onAddExercise = () => {
    if (exercises[exercises.length - 1].name === '') return (setAlert('Exercise must have a name', 'danger'));
    setSelectedEx(exercises.length);
    setExercises([...exercises, initialState]);
  };

  const onClick = () => { setWorkout({ ...currentWorkout, isPublic: !isPublic }); };

  const onRemoveEx = () => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      const copy = exercises.slice(); // Copy array
      copy.splice(selectedEx, 1);
      if (selectedEx > 0) setSelectedEx(selectedEx - 1);
      setExercises(copy);
    }
  };

  return loading ? <Spinner /> : (
    <>
      <h1 className="text-primary text-center">Edit Workout</h1>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label className="text-primary label">
            Title
            <input
              type="text"
              placeholder="Workout Title"
              value={title}
              onChange={e => onChange(e)}
              name="title"
              minLength="1"
            />
          </label>
        </div>
        <h2 className="text-primary">Exercises</h2>
        <div className="grid-on-small">
          <div onClick={() => onPrevious()} className="btn btn-light">Previous</div>
          <div onClick={() => onNext()} className="btn btn-light">Next</div>
          {exercises.length > 1 && (
            <div onClick={() => onRemoveEx()} className="btn btn-danger">Remove Exercise</div>
          )}
        </div>

        <div className="form-group">
          <label className="text-primary label">
            Name
            <input
              type="text"
              placeholder="Exercise Name"
              value={!exercises[selectedEx] ? '' : exercises[selectedEx].name}
              onChange={e => onExChange(e)}
              name="name"
              minLength="1"
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-primary label">
            Body part
            <input
              type="text"
              placeholder="Body part"
              value={!exercises[selectedEx] ? '' : exercises[selectedEx].bodypart}
              onChange={e => onExChange(e)}
              name="bodypart"
              minLength="1"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-primary label">
            Sets
            <input
              type="text"
              placeholder="Sets"
              value={!exercises[selectedEx] ? '' : exercises[selectedEx].sets}
              onChange={e => onExChange(e)}
              name="sets"
              minLength="1"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-primary label">
            Reps
            <input
              type="text"
              placeholder="Reps"
              value={!exercises[selectedEx] ? '' : exercises[selectedEx].reps}
              onChange={e => onExChange(e)}
              name="reps"
              minLength="1"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-primary label">
            Weight
            <input
              type="text"
              placeholder="Weight"
              value={!exercises[selectedEx] ? '' : exercises[selectedEx].weight}
              onChange={e => onExChange(e)}
              name="weight"
              minLength="1"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-primary label">
            Comment
            <input
              type="text"
              placeholder="Comment"
              value={!exercises[selectedEx] ? '' : exercises[selectedEx].comment}
              onChange={e => onExChange(e)}
              name="comment"
              minLength="1"
            />
          </label>
        </div>

        <div className="btn btn-primary" onClick={e => onAddExercise(e)}>Add another exercise</div>

        <div className="form-group">
          <label htmlFor="isPublic" className="text-primary">Public?{' '}
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => onClick()}
              name="isPublic"
            />
          </label>
        </div>
        <div className="grid-on-small">
          <input type="submit" className="btn btn-primary" value="Update" />
          <Link to="/workouts" className="btn btn-secondary">Go Back</Link>
        </div>
      </form>
    </>
  );
};

EditWorkout.propTypes = {
  match: PropTypes.object.isRequired,
  getWorkout: PropTypes.func.isRequired,
  workout: PropTypes.object.isRequired,
  createWorkout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  workout: state.workout,
});

export default connect(mapStateToProps, { loadUser, getWorkout, createWorkout, setAlert })(EditWorkout);
