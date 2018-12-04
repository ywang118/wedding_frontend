import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Label } from 'semantic-ui-react';
import { withRouter } from "react-router";
import { createComment } from '../store/actions/index';
class NewCommentForm extends Component {

  renderDescriptionField = (field) => {
   return (
     <Form.Field>
       <label>Description</label>
       <textarea type="text" {...field.input} />
       {field.meta.touched ? field.meta.error : ""}
     </Form.Field>
   )
 }
 renderInputField = (field) => {
  return (
    <Form.Field>
      <label className="form-label">{field.label}</label>
      <input type="text" {...field.input} />
      {field.meta.touched && field.meta.error ? <Label basic color='red' pointing> {field.meta.error}</Label> : ""}
    </Form.Field>
  )
}

onSubmit = (values) => {
  createComment(values, this.props.photographerId, this.props.userId, (url) => {
    this.props.history.push(url)
  });
}
  render(){
    return(
      <Form className="new-comment-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="description" component={this.renderDescriptionField} />
        <Field name="date" label="Date" component={this.renderInputField} />
        <Button type='submit' color="blue" inverted>Submit</Button>
      </Form>
    )
  }
}

function validate(values) {
  const errors = {};

  // values = {title: "asdf", description: "inputvalue", content: ""}

  if (!values.description) {
    errors.description = "Description cannot be blank";
  }
  if (!values.date) {
    errors.date = "Date cannot be blank";
  }
  return errors;
}
export default reduxForm({
  validate,
  form: "NewCommentForm"
})(connect()(withRouter(NewCommentForm)));
