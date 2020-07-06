import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      redirectToUserProfessionDataView: false
    };
    this.goToUserProfessionDataView = this.goToUserProfessionDataView.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.setState({email: this.props.location.state.email})
  }

  goToUserProfessionDataView() {
    if (this.state.first_name && this.state.last_name ) {
      this.setState({redirectToUserProfessionDataView: true});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    if (this.state.redirectToUserProfessionDataView) {
      return (<Redirect to={{ pathname: '/registration/professions', state: { first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email } }} />)
    }

    return (
      <div class="container">
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">Primer nombre</label>
            <input type="text" name="first_name" placeholder="Primer nombre" onChange={this.onChange}/>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">Primer apellido</label>
            <input type="text" name="last_name" placeholder="Primer apellido" onChange={this.onChange}/>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <input type="submit" value="Continuar" class="button-primary" onClick={this.goToUserProfessionDataView}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Name;
