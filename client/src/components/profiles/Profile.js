import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Profile = ({ getProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getProfile();
  },[getProfile]);

  return loading && profile === null ? <Spinner /> : 
    <Fragment>
      <div className="profile-logo-container">
        <div className="profile-logo">
          <div className="profile-logo-text">DR</div>
        </div>
      </div>

      <section className="profile-info">
        <h2>Age</h2>
        <h2>Weight</h2>
        <h2>Height</h2>
        <h2>Gender</h2>

        <p>22</p>
        <p>85kg</p>
        <p>176cm</p>
        <p>Male</p>
      </section>

      <section className="profile-workouts">
        <h1 className="large text-primary text-center">Your Latest Workouts</h1>
        <div className="profile-workouts-container">
          <div className="profile-workout-card">PPL</div>
          <div className="profile-workout-card">Full Body</div>
          <div className="profile-workout-card">P90X</div>
        </div>
        <div className="text-center">
          <Link to="/workouts">View All Workouts</Link>
        </div>
      </section>
    </Fragment>;

};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Profile);
