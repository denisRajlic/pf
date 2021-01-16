import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { loadUser } from '../../actions/auth';
import { getWorkouts } from '../../actions/workout';
import { setAuthToken } from '../../store';

const Profile = ({
  getProfile,
  loadUser,
  getWorkouts,
  profile: { profile, loading },
  workout: { workouts },
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    loadUser();
    getProfile();
    getWorkouts();
  }, [loadUser, getProfile, getWorkouts]);

  const [initialProfile, setProfile] = useState({
    birthDate: '',
    weight: '',
    height: '',
    user: '',
    gender: '',
  });

  useEffect(() => {
    if (profile)
      setProfile({
        birthDate: profile.birthDate ? profile.birthDate : '',
        weight: profile.weight ? profile.weight : '',
        height: profile.height ? profile.height : '',
        user: profile.user ? profile.user : '',
        gender: profile.gender ? profile.gender : '',
      });
  }, [profile]);

  const { birthDate, weight, height, gender, user } = initialProfile;

  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10).toString();

  return loading && profile === null ? <Spinner /> :
    <Fragment>
      {profile === null ? (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
        </>
      ) : (
        <>
          <div className="profile-logo-container">
          <div className="profile-logo">
            {user && user.name && (
              <div className="profile-logo-text">{user.name[0].concat(user.surname[0])}</div>
            )}
          </div>
        </div>

        <section className="profile-info">
          <h2>Age</h2>
          <h2>Weight</h2>
          <h2>Height</h2>
          <h2>Gender</h2>

          <p>{getAge(birthDate)}</p>
          <p>{weight}</p>
          <p>{height}</p>
          <p>{gender}</p>
        </section>

        <div className="text-center my-2">
          <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link>
        </div>

        <section className="profile-workouts">
          {workouts.length > 0 ? (
            <>
            <h1 className="large text-primary text-center">Your Latest Workouts</h1>
            <div className="profile-workouts-container">
            {/* Change CSS column variable depending on how many workouts the user has */}
            {workouts.length < 3 ? (document.documentElement.style.setProperty('--colNum', workouts.length)) : (document.documentElement.style.setProperty('--colNum', 3)) }

            {workouts.slice(0, 3).map(workout => (
              <div key={workout._id} className="profile-workout-card">
              {
                workout.title.length > 7 ?
                  workout.title.slice(0, 7).concat('...')
                :
                  workout.title
              }
              </div>
              ))
            }
          </div>
          <div className="text-center">
            <Link to="/workouts">View All Workouts</Link>
          </div>
            </>
          ) : (
            <>
              <p className="my-1 text-center">No workouts yet? <Link to="/create-workout">Create one here</Link></p>
            </>
          )}
        </section>
        </>
      )}

    </Fragment>;

};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getWorkouts: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  workout: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  workout: state.workout,
});

export default connect(mapStateToProps, { loadUser, getProfile, getWorkouts })(Profile);
