import React from 'react';

class ProfessionSearchListItem extends React.Component {

  handleProfessionClicked(professionId, professionName) {
    this.props.onSearchTermChange(professionId, professionName);
  }

  render() {
    return (
      <li>
        <span dangerouslySetInnerHTML={{ __html: this.props.profession.name }} onClick={() => this.handleProfessionClicked(this.props.profession.id, this.props.profession.name)} />
      </li>
    );
  }
}

export default ProfessionSearchListItem;
