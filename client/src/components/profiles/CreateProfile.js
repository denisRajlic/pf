import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, stateProfile }) => {
  const [profile, setProfile] = useState({
    birthDate: '',
    weight: '',
    height: '',
    gender: '',
  });

  const { birthDate, weight, height, gender } = profile;

  const onChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  console.log(birthDate);

  const onSubmit = e => {
    e.preventDefault();
    createProfile({ birthDate, weight, height, gender });
  };

  // Redirect if profile already exists
  if (stateProfile.profile) return <Redirect to="/profile" />;

  return (
    <>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to track your progress
      </p>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <h2 className="text-primary">Birth Date</h2>
        <div className="form-group">
          <label className="text-primary label">
            Birth Date
            <input
              type="date"
              placeholder="Add your birthday"
              value={birthDate}
              onChange={e => onChange(e)}
              name="birthDate"
              minLength="1"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-primary label">
            Weight
            <input
              type="text"
              placeholder="Weight"
              value={weight}
              onChange={e => onChange(e)}
              name="weight"
              minLength="1"
              maxLength="6"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-primary label">
            Height
            <input
              type="text"
              placeholder="Height"
              value={height}
              onChange={e => onChange(e)}
              name="height"
              minLength="1"
              maxLength="6"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-primary label">
            Gender
            <input
              type="text"
              placeholder="Gender"
              value={gender}
              onChange={e => onChange(e)}
              name="gender"
              minLength="1"
              maxLength="6"
            />
          </label>
        </div>
        <div className="buttons">
          <input type="submit" className="btn btn-primary" value="Create Profile" />
        </div>
      </form>
    </>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  stateProfile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  stateProfile: state.profile,
});

export default connect(mapStateToProps, { createProfile })(CreateProfile);
