import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import InterestItem from '../containers/InterestItem';

class Professions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      profession: '',
      interests: [],
      redirectToUserGeneralDataView: false
    };
    this.goToUserGeneralDataView = this.goToUserGeneralDataView.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fetchAllInterests = this.fetchAllInterests.bind(this);
    this.handleInterestSelection = this.handleInterestSelection.bind(this);
  }

  componentWillMount() {
    this.fetchAllInterests();
    this.setState({
      first_name: this.props.location.state.first_name,
      last_name: this.props.location.state.last_name,
      email: this.props.location.state.email
    })
  }

  fetchAllInterests() {
    axios.get('http://localhost:3000/api/all_interests').then(response => {
      this.setState({ interests: response.data });
    })
    .catch((error) => {
      console.log('Cannot get all interests data because: ' + error);
    });
  }

  goToUserGeneralDataView() {
    console.log("profession: " + this.state.profession);
    const selectedInterests = this.state.interests.filter(interest => interest.isSelected === true);
    console.log("selectedInterests count: " + selectedInterests);
    if (this.state.profession && selectedInterests.length > 0) {
      this.setState({redirectToUserGeneralDataView: true});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleInterestSelection(interest) {
    if (interest.isSelected) {
      interest.isSelected = false
    } else {
      interest.isSelected = true
    }
  }

  renderInterests() {
    let filteredInterests = this.state.interests.filter(
      (interest) => {
        return interest.name.toLowerCase();
      }
    );

    return filteredInterests.map((interest) => {
      return <InterestItem key={interest.id} data={interest} onInterestClicked={(interest) => {this.handleInterestSelection(interest)}}/>
    });
  }

  render() {
    if (this.state.redirectToUserGeneralDataView) {
      return (<Redirect to={{ pathname: '/registration/general', state: { first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email } }} />)
    }

    return (
      <div class="container">
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">Profesiones</label>
            <input type="text" name="profession" placeholder="Profesiones" onChange={this.onChange}/>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">Intereses</label>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            {this.renderInterests()}
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
