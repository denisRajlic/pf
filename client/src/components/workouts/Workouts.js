import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const Workouts = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div>
      <h1>Hello{' '}{user && user.name},{' '}here are your workouts</h1>
      <Link to="/create-workout" className="btn btn-primary">Create Workout</Link>
    </div>
  );
};

Workouts.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Workouts);
