import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { getProfile } from '../../actions/profile';
import { loadUser } from '../../actions/auth';

const EditProfile = ({ loadUser, createProfile, getProfile, stateProfile }) => {
  const [profile, setProfile] = useState({
    birthDate: '',
    weight: '',
    height: '',
    gender: '',
  });

  useEffect(() => {
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
        <h2 className="text-primary">Birth Date</h2>
        <p className="text-primary">(mm-dd-yyyy)</p>
        <div className="form-group">
          <input
            type="date"
            placeholder="Add your birthday"
            value={birthDate}
            onChange={e => onChange(e)}
            name="birthDate"
            minLength="1"
            required
          />
        </div>
        <h2 className="text-primary">Weight</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Weight"
            value={weight}
            onChange={e => onChange(e)}
            name="weight"
            minLength="1"
          />
        </div>
        <h2 className="text-primary">Height</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Height"
            value={height}
            onChange={e => onChange(e)}
            name="height"
            minLength="1"
          />
        </div>
        <h2 className="text-primary">Gender</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={e => onChange(e)}
            name="gender"
            minLength="1"
          />
        </div>

        <div className="grid-on-small">
          <input type="submit" className="btn btn-primary" value="Create Profile" />
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
