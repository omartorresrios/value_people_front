import React from 'react';
import ProfessionSearchListItem from './ProfessionSearchListItem';

class ProfessionSearchResultsList extends React.Component {

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
        {this.renderProfessionHeading()}
        {this.renderProfessions()}
      </ul>
    );
  }

  renderProfessions() {
    let filteredProfessions = this.props.professions.filter(
      (profession) => {
        return profession.name.toLowerCase().indexOf(this.props.term.toLowerCase()) !== -1;
      }
    );

    return filteredProfessions.map((profession) => {
      return <ProfessionSearchListItem key={profession.id} profession={profession} onSearchTermChange={(professionId, professionName) => {this.props.sendData(professionId, professionName)}}/>
    });
  }

  renderProfessionHeading() {
    if (this.props.professions.length === 0) { return; }

    return <li className="autocomplete-heading"><h4>Profesiones</h4></li>
  }
}

export default ProfessionSearchResultsList;
