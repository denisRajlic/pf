import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      {user && user.name && (
        <li><Link to="/profile">{user.name}</Link></li>
      )}
      <li><Link to="/workouts">Workouts</Link></li>
      <li><Link to="/create-workout"><i className="fas fa-plus" /> <span className="hide-sm">Create Workout</span> </Link></li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />
          {' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <header>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-dumbbell" />
            {' '}
            PlanningFitness
          </Link>
        </h1>
        {!loading && (
          <>{ isAuthenticated ? authLinks : guestLinks }</>
        )}
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
