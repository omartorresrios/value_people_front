import React from 'react';
import InterestSearchListItem from './InterestSearchListItem';

class InterestSearchResultsList extends React.Component {

  render() {
    return (
      <ul id="autocomplete-items" onMouseEnter={() => {this.props.setPreventHideDropdown()}} onMouseLeave={() => {this.props.resetPreventHideDropdown()}}>
        <span className="dropdown-arrow-top"></span>
        <span className="dropdown-arrow-bottom"></span>
        <li>
          <a href={`/search?q=${this.props.term}`}>
            <i className="fa fa-search"></i> Search for <strong>{this.props.term}</strong>
          </a>
        </li>
        {this.renderInterestHeading()}
        {this.renderInterests()}
      </ul>
    );
  }

  renderInterests() {
    let filteredInterests = this.props.interests.filter(
      (interest) => {
        return interest.name.toLowerCase().indexOf(this.props.term.toLowerCase()) !== -1;
      }
    );

    return filteredInterests.map((interest) => {
      return <InterestSearchListItem key={interest.id} interest={interest} onSearchTermChange={(interestId, interestName) => {this.props.sendData(interestId, interestName)}}/>
    });
  }

  renderInterestHeading() {
    if (this.props.interests.length === 0) { return; }

    return <li className="autocomplete-heading"><h4>Intereses</h4></li>
  }
}

export default InterestSearchResultsList;
