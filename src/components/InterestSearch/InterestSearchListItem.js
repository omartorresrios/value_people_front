import React from 'react';

class InterestSearchListItem extends React.Component {

  handleInterestClicked(interestId, interestName) {
    this.props.onSearchTermChange(interestId, interestName);
  }

  render() {
    return (
      <li>
        <span dangerouslySetInnerHTML={{ __html: this.props.interest.name }} onClick={() => this.handleInterestClicked(this.props.interest.id, this.props.interest.name)} />
      </li>
    );
  }
}

export default InterestSearchListItem;
