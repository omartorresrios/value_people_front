import React from 'react';
import PropTypes from 'prop-types'
import '../../styles/InterestItem.css';
import { Link } from 'react-router-dom';

class InterestItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isInterestClicked: false
    }
  }

  componentDidMount() {
    const isSelected = this.props.isSelected;
    if (isSelected) {
      this.setState({ isInterestClicked: isSelected })
    }
  }

  handleInterestClicked(interest) {
    this.setState({ isInterestClicked: !this.state.isInterestClicked })
    this.props.onInterestClicked(interest);
  }

  render() {
    const {isInterestClicked} = this.state;
    return (
      <button class={`interest-button ${isInterestClicked ? 'is-selected' : 'is-not-selected'}`} onClick={() => this.handleInterestClicked(this.props.data)}>{this.props.data.name}</button>

    );
  }
}

export default InterestItem;
