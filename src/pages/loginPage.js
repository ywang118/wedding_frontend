import React, { Fragment } from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <Fragment>
      <div className="login-div">
      
      <h1>Log in</h1>

      <LoginForm />
      <h4>Don't have an account?</h4>
      <Link to="/signup"><h5>Sign up</h5></Link>
      </div>
    </Fragment>
  )
}
export default LoginPage
