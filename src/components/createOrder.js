import React from 'react';
import { withRouter } from "react-router";
import DatePicker from 'react-datePicker';
import "react-datepicker/dist/react-datepicker.css";

class CreateOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}
export default CreateOrder
