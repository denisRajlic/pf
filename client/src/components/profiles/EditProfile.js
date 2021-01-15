import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { getProfile } from '../../actions/profile';
import { loadUser } from '../../actions/auth';
import { setAuthToken } from '../../store';

const EditProfile = ({ loadUser, createProfile, getProfile, stateProfile }) => {
  const [profile, setProfile] = useState({
    birthDate: '',
    weight: '',
    height: '',
    gender: '',
  });

  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    loadUser();
    getProfile();
  }, [loadUser, getProfile]);

  useEffect(() => {
    setProfile({
      birthDate: stateProfile.loading || !stateProfile ? '' : stateProfile.profile.birthDate,
      weight: stateProfile.loading || !stateProfile ? '' : stateProfile.profile.weight,
      height: stateProfile.loading || !stateProfile ? '' : stateProfile.profile.height,
      gender: stateProfile.loading || !stateProfile ? '' : stateProfile.profile.gender,
    });
  }, [stateProfile]);

  const { birthDate, weight, height, gender } = profile;

  const onChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const edit = true;
    createProfile({ birthDate, weight, height, gender, edit });
  };

  return (
    <>
      <h1 className="large text-primary">
        Edit Your Profile
      </h1>

      <form className="form" onSubmit={e => onSubmit(e)}>
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

        <div className="grid-on-small">
          <input type="submit" className="btn btn-primary" value="Edit Profile" />
          <Link to='/profile' className="btn btn-light">Back To Profile</Link>
        </div>
      </form>
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  stateProfile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  stateProfile: state.profile,
});


export default connect(mapStateToProps, { createProfile, getProfile, loadUser })(EditProfile);
