import React, {
  useState, Fragment,
} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import setAlert from '../../actions/alert';
import { createWorkout } from '../../actions/workout';

const CreateWorkout = ({ createWorkout, history, setAlert }) => {
  const [selectedEx, setSelectedEx] = useState(0);

  const [state, setState] = useState({
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

  const [exercises, setExercises] = useState([initialState]);

  const { title, isPublic } = state;

  const onSubmit = async e => {
    e.preventDefault();
    createWorkout({ title, isPublic, exercises });
    history.push('/workouts');
  };

  const onClick = () => {
    setState({ ...state, isPublic: !isPublic });
  };

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const onAddExercise = () => {
    if (exercises[exercises.length - 1].name === '') return (setAlert('Exercise must have a name', 'danger'));
    setSelectedEx(exercises.length);
    setExercises([...exercises, initialState]);
  };

  const onPrevious = () => { if (selectedEx > 0) return setSelectedEx(selectedEx - 1); };

  const onNext = () => {
    if (selectedEx < exercises.length - 1) return setSelectedEx(selectedEx + 1);
  };

  const onExChange = e => {
    const copy = exercises.slice(); // Copy array
    copy[selectedEx][e.target.name] = e.target.value;
    setExercises(copy);
  };

  const onRemoveEx = () => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      const copy = exercises.slice(); // Copy array
      copy.splice(selectedEx, 1);
      if (selectedEx > 0) setSelectedEx(selectedEx - 1);
      setExercises(copy);
    }
  };

  return (
    <>
      <h1 className="text-primary text-center">Create Workout</h1>

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
        <h2 className="text-primary">List Exercises</h2>
        {exercises && exercises.length > 0 && (
        <div className="buttons">
          <div onClick={() => onPrevious()} className="btn btn-light">Previous</div>
          <div onClick={() => onNext()} className="btn btn-light">Next</div>
          {exercises.length > 1 && (
            <div onClick={() => onRemoveEx()} className="btn btn-danger">Remove Exercise</div>
          )}
        </div>
        )}

        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={!exercises[selectedEx] && !exercises[selectedEx].name ? '' : exercises[selectedEx].name}
            onChange={e => onExChange(e)}
            name="name"
            minLength="1"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Body Part"
            value={!exercises[selectedEx] && !exercises[selectedEx].bodypart ? '' : exercises[selectedEx].bodypart}
            onChange={e => onExChange(e)}
            name="bodypart"
            minLength="1"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Sets"
            value={!exercises[selectedEx] && !exercises[selectedEx].sets ? '' : exercises[selectedEx].sets}
            onChange={e => onExChange(e)}
            name="sets"
            minLength="1"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Reps"
            value={!exercises[selectedEx] && !exercises[selectedEx].reps ? '' : exercises[selectedEx].reps}
            onChange={e => onExChange(e)}
            name="reps"
            minLength="1"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Weight"
            value={!exercises[selectedEx] && !exercises[selectedEx].weight ? '' : exercises[selectedEx].weight}
            onChange={e => onExChange(e)}
            name="weight"
            minLength="1"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Comment"
            value={!exercises[selectedEx] && !exercises[selectedEx].comment ? '' : exercises[selectedEx].comment}
            onChange={e => onExChange(e)}
            name="comment"
            minLength="1"
          />
        </div>

        <div className="btn btn-primary" onClick={e => onAddExercise(e)}>Add another exercise</div>

        <div className="form-group">
          <label htmlFor="isPublic">Make Workout Public?{' '}
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => onClick()}
              name="isPublic"
            />
          </label>
        </div>
        <div className="buttons">
          <input type="submit" className="btn btn-primary" value="Create" />
          <Link to="/workouts" className="btn btn-secondary">Go Back</Link>
        </div>
      </form>
    </>

  );
};

CreateWorkout.propTypes = {
  createWorkout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { createWorkout, setAlert })(withRouter(CreateWorkout));
