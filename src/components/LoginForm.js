import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { loginUser } from '../store/actions/index'
import { Button, Form, Message } from 'semantic-ui-react'


class LoginForm extends React.Component {
  state = { username: '', password: '' }

  handleChange = (e, data) => {
    // data.name -> 'username'
    this.setState({ [data.name]: data.value })
  }

  handleLoginSubmit = () => { //semantic forms preventDefault automatically
    this.props.loginUser(this.state.username, this.state.password) //comes from mapDispatchToProps
    this.setState({ username: '', password: '' }) //reset form to initial state
  }

  render() {
    return this.props.loggedIn ? (
      <Redirect to="/profile" />
    ) : (
      <div className="login-form">
        <Form className="login-signup-form"
          onSubmit={this.handleLoginSubmit}
          size="mini"
          key="mini"
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          <Message error header={this.props.failedLogin ? this.props.error : null} />
            <div className="change-input-style">
            <Form.Input
              label="username"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            </div>
            <div className="change-input-style">
            <Form.Input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            </div>
          <Button className="login-btn" type="submit">Log in</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {

  return {

    authenticatingUser: state.userReducer.authenticatingUser,
    failedLogin: state.userReducer.failedLogin,
    error: state.userReducer.error,
    loggedIn: state.userReducer.loggedIn
  }
}

export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm))
