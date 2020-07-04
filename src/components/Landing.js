import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      redirectToUserDataView: false
    };
    this.goToUserNameDataView = this.goToUserNameDataView.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  goToUserNameDataView() {
    if (this.state.email) {
      this.setState({redirectToUserDataView: true});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    if (this.state.redirectToUserDataView) {
      return (<Redirect to={{ pathname: '/registration/name', state: { email: this.state.email } }} />)
    }

    return (
      <div class="container">
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">Correo</label>
            <input type="email" name="email" placeholder="test@example.com" onChange={this.onChange}/>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <input type="submit" value="Registrar" class="button-primary" onClick={this.goToUserNameDataView}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
