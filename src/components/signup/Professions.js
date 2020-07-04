import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Professions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      redirectToUserGeneralDataView: false
    };
    this.goToUserGeneralDataView = this.goToUserGeneralDataView.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  goToUserGeneralDataView() {
    if (this.state.first_name && this.state.last_name ) {
      this.setState({redirectToUserGeneralDataView: true});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">Profesiones</label>
            <input type="text" name="professions" placeholder="Profesiones" onChange={this.onChange}/>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">Intereses</label>
            <input type="text" name="interests" placeholder="Intereses" onChange={this.onChange}/>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <input type="submit" value="Continuar" class="button-primary" onClick={this.goToUserGeneralDataView}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Professions;
