import React from 'react'
import { connect } from 'react-redux'
import {withRouter, Redirect } from 'react-router'
import {signupUser} from '../store/actions/index'
import {Button, Form, Message} from 'semantic-ui-react'

class SignupForm extends React.Component {
  state = {username: '', password: ''}

  handleChange = (e,data) => {
    this.setState ({ [data.name]: data.value}, ()=> {
      // console.log(this.state)
    })
  }
  handleLoginSubmit = ()=> {
    this.props.signupUser(this.state.username, this.state.password)
    this.setState({username: '', password: ''}) //reset form to initial state
  }
  render(){
    return this.props.loggedIn ? (
      <Redirect to= "/profile" />
    ) : (
      <div className="login-form">
      <Form className="login-signup-form"
      onSubmit= {this.handleLoginSubmit}
      size = "mini"
      key = "mini"
      loading={this.props.authenticatingUser}
      error={this.props.failedLogin}>
      <Message error header= {this.props.failedLogin ? this.props.error : null} />
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
       <Button className="login-btn" color='pink' type="submit">Sign up</Button>
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

export default withRouter(connect(mapStateToProps, { signupUser })(SignupForm))
