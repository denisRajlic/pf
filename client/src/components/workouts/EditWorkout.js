import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWorkout, createWorkout } from '../../actions/workout';
import setAlert from '../../actions/alert';

import Spinner from '../layout/Spinner';

const EditWorkout = ({
  match,
  workout: { workout, loading },
  getWorkout,
  createWorkout,
  setAlert,
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
    getWorkout(match.params.id);
  }, [getWorkout, match]);

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
    const copy = exercises.slice(); // Copy array
    copy.splice(selectedEx, 1);
    if (selectedEx > 0) setSelectedEx(selectedEx - 1);
    setExercises(copy);
  };

  return loading ? <Spinner /> : (
    <>
      <h1 className="text-primary text-center">Edit Workout</h1>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <h2 className="text-primary">Title</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Workout Title"
            value={title}
            onChange={e => onChange(e)}
            name="title"
            minLength="1"
          />
        </div>
        <h2 className="text-primary">Exercises</h2>
        <div className="buttons">
          <div onClick={() => onPrevious()} className="btn btn-light">Previous</div>
          <div onClick={() => onNext()} className="btn btn-light">Next</div>
          {exercises.length > 1 && (
            <div onClick={() => onRemoveEx()} className="btn btn-danger">Remove Exercise</div>
          )}
        </div>

        <h3 className="text-primary">Name</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Exercise Name"
            value={!exercises[selectedEx] ? '' : exercises[selectedEx].name}
            onChange={e => onExChange(e)}
            name="name"
            minLength="1"
          />
        </div>

        <h3 className="text-primary">Body part</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Body part"
            value={!exercises[selectedEx] ? '' : exercises[selectedEx].bodypart}
            onChange={() => console.log('change')}
            name="bodypart"
            minLength="1"
          />
        </div>

        <h3 className="text-primary">Sets</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Sets"
            value={!exercises[selectedEx] ? '' : exercises[selectedEx].sets}
            onChange={() => console.log('change')}
            name="sets"
            minLength="1"
          />
        </div>

        <h3 className="text-primary">Reps</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Reps"
            value={!exercises[selectedEx] ? '' : exercises[selectedEx].reps}
            onChange={() => console.log('change')}
            name="reps"
            minLength="1"
          />
        </div>

        <h3 className="text-primary">Weight</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Weight"
            value={!exercises[selectedEx] ? '' : exercises[selectedEx].weight}
            onChange={() => console.log('change')}
            name="weight"
            minLength="1"
          />
        </div>

        <h3 className="text-primary">Comment</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Comment"
            value={!exercises[selectedEx] ? '' : exercises[selectedEx].comment}
            onChange={() => console.log('change')}
            name="comment"
            minLength="1"
          />
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

        <input type="submit" className="btn btn-primary" value="Update" />
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
};

const mapStateToProps = state => ({
  workout: state.workout,
});

export default connect(mapStateToProps, { getWorkout, createWorkout, setAlert })(EditWorkout);
