import React from 'react';
import PropTypes from 'prop-types'
import '../../styles/InterestItem.css';
import { Link } from 'react-router-dom';

class ProfessionItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isProfessionClicked: false
    }
  }

  componentDidMount() {
    const isSelected = this.props.isSelected;
    if (isSelected) {
      this.setState({ isProfessionClicked: isSelected })
    }
  }

  handleProfessionClicked(profession) {
    this.setState({ isProfessionClicked: !this.state.isProfessionClicked })
    this.props.onProfessionClicked(profession);
  }

  render() {
    const {isProfessionClicked} = this.state;
    return (
      <button class={`interest-button ${isProfessionClicked ? 'is-selected' : 'is-not-selected'}`} onClick={() => this.handleProfessionClicked(this.props.data)}>{this.props.data.name}</button>
    );
  }
}

export default ProfessionItem;
