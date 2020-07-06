import React from 'react';
import PropTypes from 'prop-types'
import '../../styles/InterestItem.css';
import { Link } from 'react-router-dom';

class InterestItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isInterestSelected: false
    }
  }

  handleInterestClicked(interest) {
    this.setState({ isInterestSelected: !this.state.isInterestSelected })
    console.log(interest.name + " is selected?: " + this.state.isInterestSelected);
    this.props.onInterestClicked(interest);
  }

  render() {
    const {isInterestSelected} = this.state;
    return (
      <button class={`interest-button ${isInterestSelected ? 'is-selected' : 'is-not-selected'}`} onClick={() => this.handleInterestClicked(this.props.data)}>{this.props.data.name}</button>
    );
  }
}

export default InterestItem;
