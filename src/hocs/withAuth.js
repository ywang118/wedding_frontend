import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
// import { fetchCurrentUser } from '../actions/user'
import { Loader } from 'semantic-ui-react';

//WrappedComponent is the Profile component
const withAuth = (WrappedComponent) => {
  class AuthorizedComponent extends Component {
    // componentDidMount() {
    //   if (localStorage.getItem('jwt') && !this.props.loggedIn) this.props.fetchCurrentUser()
    // }

    render() {
      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        //i have a token and i'm logged in according to redux
        // wrapped component in this case is Profile
        return <WrappedComponent />
      } else if (localStorage.getItem('jwt') && this.props.authenticatingUser) {
        //we're currently fetching, show a loading spinner
        return <Loader active inline="centered" />
      } else {
        //user is not AUTHORIZED to see this component
        return <Redirect to="/login" />
      }
    }
  }

  const mapStateToProps = state => {
    return {
      loggedIn: state.userReducer.loggedIn,
      authenticatingUser: state.userReducer.authenticatingUser
    }
  }

  return connect(mapStateToProps)(AuthorizedComponent)
}

export default withAuth
