import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import setAlert from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, auth: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
  });

  const {
    name, surname, email, password, password2,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) setAlert('Passwords do not match', 'danger');
    else register({ name, surname, email, password });
  };

  if (isAuthenticated) return <Redirect to="/workouts" />;

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user" />{' '}Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label className="text-primary label">
            Name
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-primary label">
            Surname
            <input
              type="text"
              placeholder="Surname"
              name="surname"
              value={surname}
              onChange={e => onChange(e)}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-primary label">
            Email
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-primary label">
            Password
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-primary label">
            Confirm Password
            <input
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={e => onChange(e)}
              name="password2"
              minLength="6"
            />
          </label>
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">Already have an account?{' '}<Link to="/login">Sign In</Link></p>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
