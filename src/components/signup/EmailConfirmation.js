import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class EmailConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      professions: '',
      interests: [],
      description: '',
      image: ''
    };
  }

  componentWillMount() {
    this.setState({email: this.props.location.state.email,
                   first_name: this.props.location.state.first_name,
                   last_name: this.props.location.state.last_name,
                   professions: this.props.location.state.professions,
                   interests: this.props.location.state.interests,
                   description: this.props.location.state.description,
                   image: this.props.location.state.image})
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">EmailConfirmation</label>
          </div>
        </div>
      </div>
    );
  }
}
export default EmailConfirmation;
