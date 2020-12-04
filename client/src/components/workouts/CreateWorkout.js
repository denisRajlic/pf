import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createWorkout } from '../../actions/workout';

const CreateWorkout = ({ createWorkout }) => {
  const [state, setState] = useState({
    title: '',
    isPublic: false,
  });

  const [exercise, setExercise] = useState({
    name: '',
    bodypart: '',
    sets: '',
    reps: '',
    weight: '',
    comment: '',
  });

  const [exercises, setExercises] = useState([]);

  const {
    title, isPublic,
  } = state;

  const {
    name, bodypart, sets, reps, weight, comment,
  } = exercise;

  const onSubmit = async e => {
    e.preventDefault();
    createWorkout({ title, isPublic, exercises });
  };

  const onClick = () => {
    setState({ ...state, isPublic: !isPublic });
  };

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const onAddExercise = () => {
    setExercises([
      ...exercises,
      exercise,
    ]);
    setExercise({
      ...exercise,
      name: '',
      bodypart: '',
      sets: '',
      reps: '',
      weight: '',
      comment: '',
    });
  };

  return (
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

      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setExercise({ ...exercise, [e.target.name]: e.target.value })}
          name="name"
          minLength="1"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Body Part"
          value={bodypart}
          onChange={e => setExercise({ ...exercise, [e.target.name]: e.target.value })}
          name="bodypart"
          minLength="1"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Sets"
          value={sets}
          onChange={e => setExercise({ ...exercise, [e.target.name]: e.target.value })}
          name="sets"
          minLength="1"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Reps"
          value={reps}
          onChange={e => setExercise({ ...exercise, [e.target.name]: e.target.value })}
          name="reps"
          minLength="1"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Weight"
          value={weight}
          onChange={e => setExercise({ ...exercise, [e.target.name]: e.target.value })}
          name="weight"
          minLength="1"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={e => setExercise({ ...exercise, [e.target.name]: e.target.value })}
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
      <input type="submit" className="btn btn-primary" value="Submit" />
    </form>
  );
};

CreateWorkout.propTypes = {
  createWorkout: PropTypes.func.isRequired,
};

export default connect(null, { createWorkout })(CreateWorkout);
