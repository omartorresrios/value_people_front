import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import InterestItem from '../containers/InterestItem';
import ProfessionItem from '../containers/ProfessionItem';
import ProfessionSearchBar from '../ProfessionSearch/ProfessionSearchBar';
import ProfessionSearchResultsList from '../ProfessionSearch/ProfessionSearchResultsList';
import InterestSearchBar from '../InterestSearch/InterestSearchBar';
import InterestSearchResultsList from '../InterestSearch/InterestSearchResultsList';

class Professions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      profession: '',
      professions: [],
      interest: '',
      interests: [],
      redirectToUserGeneralDataView: false,
      isProfessionInputSelected: false,
      isInterestInputSelected: false,
      professionPreventHideDropdown: false
    };
    this.goToUserGeneralDataView = this.goToUserGeneralDataView.bind(this);
    this.addOtherProfession = this.addOtherProfession.bind(this);
    this.addOtherInterest = this.addOtherInterest.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fetchAllInterests = this.fetchAllInterests.bind(this);
    this.fetchAllProfessions = this.fetchAllProfessions.bind(this);
    this.handleProfessionSelection = this.handleProfessionSelection.bind(this);
    this.handleInterestSelection = this.handleInterestSelection.bind(this);
    this.professionShowDropdown = this.professionShowDropdown.bind(this);
    this.professionHideDropdown = this.professionHideDropdown.bind(this);
    this.interestShowDropdown = this.interestShowDropdown.bind(this);
    this.interestHideDropdown = this.interestHideDropdown.bind(this);
    this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);
    this.professionSelected = this.professionSelected.bind(this);
    this.interestSelected = this.interestSelected.bind(this);
    this.cleanInputField = this.cleanInputField.bind(this);
  }

  componentWillMount() {
    this.fetchAllInterests();
    this.fetchAllProfessions();
    this.setState({
      first_name: this.props.location.state.first_name,
      last_name: this.props.location.state.last_name,
      email: this.props.location.state.email
    })
  }

  fetchAllProfessions() {
    axios.get('http://localhost:3000/api/all_professions').then(response => {
      this.setState({professions: response.data});
    })
    .catch((error) => {
      console.log('Cant get all professions data because: ' + error);
    });
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
    const selectedInterests = this.state.interests.filter(interest => interest.isSelected === true);
    const selectedProfessions = this.state.professions.filter(profession => profession.isSelected === true);
    if (selectedProfessions.length > 0 && selectedInterests.length > 0) {
      this.setState({redirectToUserGeneralDataView: true});
    }
  }

  addOtherProfession() {
    const newProfession = {
      name: this.state.profession,
      isSelected: true
    }
    this.setState({ professions: this.state.professions.concat(newProfession)}, this.cleanInputField(true));
  }

  addOtherInterest() {
    const newInterest = {
      name: this.state.interest,
      isSelected: true
    }
    this.setState({interests: this.state.interests.concat(newInterest)}, this.cleanInputField(false));
  }

  cleanInputField(isProfession) {
    isProfession ? this.setState({profession: ''}) : this.setState({interest: ''})
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleProfessionSelection(interest) {
    interest.isSelected = !interest.isSelected
  }

  handleInterestSelection(interest) {
    interest.isSelected = !interest.isSelected
  }

  renderProfessions() {
    let filteredProfessions = this.state.professions.filter((profession) => {
        if (profession.isSelected) {
          return profession.name.toLowerCase();
        }
      }
    );

    return filteredProfessions.map((profession) => {
      return <ProfessionItem key={profession.id} data={profession} isSelected={profession.isSelected} onProfessionClicked={(profession) => {this.handleProfessionSelection(profession)}}/>
    });
  }

  renderInterests() {
    let filteredInterests = this.state.interests.filter((interest) => {
        return interest.name.toLowerCase();
      }
    );

    return filteredInterests.map((interest) => {
      return <InterestItem key={interest.id} data={interest} isSelected={interest.isSelected} onInterestClicked={(interest) => {this.handleInterestSelection(interest)}}/>
    });
  }

  renderProfessionsSearchBar() {
    return (
      <div>
        <ProfessionSearchBar
          professionShowDropdown={this.professionShowDropdown}
          professionHideDropdown={this.professionHideDropdown}
          profession={this.state.profession}
          onSearchTermChange={(profession) => {this.setState({ profession });}}
          addOtherProfession={this.addOtherProfession}
        />
      </div>
    );
  };

  renderProfessionsResult() {
    if (this.state.profession.length === 0 || !this.state.isProfessionInputSelected) {
      return;
    }

    return (
      <ProfessionSearchResultsList
        setPreventHideDropdown={this.setPreventHideDropdown}
        resetPreventHideDropdown={this.resetPreventHideDropdown}
        term={this.state.profession}
        professions={this.state.professions}
        sendData={this.professionSelected}
      />
    );
  }

  renderInterestsSearchBar() {
    return (
      <div>
        <InterestSearchBar
          interestShowDropdown={this.interestShowDropdown}
          interestHideDropdown={this.interestHideDropdown}
          interest={this.state.interest}
          onSearchTermChange={(interest) => {this.setState({ interest });}}
          addOtherInterest={this.addOtherInterest}
        />
      </div>
    );
  };

  renderInterestsResult() {
    if (this.state.interest.length === 0 || !this.state.isInterestInputSelected) {
      return;
    }

    return (
      <InterestSearchResultsList
        setPreventHideDropdown={this.setPreventHideDropdown}
        resetPreventHideDropdown={this.resetPreventHideDropdown}
        term={this.state.interest}
        interests={this.state.interests}
        sendData={this.interestSelected}
      />
    );
  }

  render() {
    if (this.state.redirectToUserGeneralDataView) {
      return (<Redirect to={{ pathname: '/registration/general', state: { first_name: this.state.first_name,
                                                                          last_name: this.state.last_name,
                                                                          email: this.state.email,
                                                                          professions: this.state.professions.filter(profession => profession.isSelected === true),
                                                                          interests: this.state.interests.filter(interest => interest.isSelected === true)} }} />)
    }

    return (
      <div class="container">
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">Profesiones</label>
            {this.renderProfessionsSearchBar()}
            {this.renderProfessionsResult()}
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            {this.renderProfessions()}
          </div>
        </div>

        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">Intereses</label>
            {this.renderInterestsSearchBar()}
            {this.renderInterestsResult()}
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

  professionShowDropdown() {
    this.setState({ isProfessionInputSelected: true });
  }

  professionHideDropdown() {
    if (!this.state.professionPreventHideDropdown) {
      this.setState({ isProfessionInputSelected: false });
    }
  }

  interestShowDropdown() {
    this.setState({ isInterestInputSelected: true });
  }

  interestHideDropdown() {
    if (!this.state.interestPreventHideDropdown) {
      this.setState({ isInterestInputSelected: false });
    }
  }

  setPreventHideDropdown() {
    this.setState({ professionPreventHideDropdown: true });
  }

  resetPreventHideDropdown() {
    this.setState({ professionPreventHideDropdown: false });
  }

  professionSelected(professionId, professionName) {
    this.setState({
      professionId: professionId,
      professionName: professionName,
      professionPreventHideDropdown: false,
      isProfessionInputSelected: false
    });
  }

  interestSelected(interestId, interestName) {
    this.setState({
      interestId: interestId,
      interestName: interestName,
      interestPreventHideDropdown: false,
      isInterestInputSelected: false
    });
  }
}

export default Professions;
