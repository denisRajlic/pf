import React, { useState } from 'react';
import { connect } from 'react-redux';

const CreateWorkout = () => {
  const [state, setState] = useState({
    title: '',
    isPublic: false,
  });

  const [exercise, setExercise] = useState({
    name: 'Bench Press',
  });

  const {
    title, isPublic,
  } = state;

  const { name } = exercise;

  const onSubmit = async e => {
    e.preventDefault();
  };

  const onClick = () => {
    setState({ ...state, isPublic: !isPublic });
  };

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
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
      <h2>List Exercises</h2>

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

export default connect(null)(CreateWorkout);
