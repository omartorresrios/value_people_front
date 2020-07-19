import React from 'react';

class ProfessionSearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        <form action="/search" acceptCharset="UTF-8" method="get">
          <input name="utf8" type="hidden" value="√" />
          <input
            onFocus={() => this.props.professionShowDropdown()}
            onBlur={() => this.props.professionHideDropdown()}
            value={this.props.profession}
            onChange={(event) => {this.handleInputChange(event.target.value)}}
            placeholder="Agrega una profesión"
            autoComplete="off"
            type="search"
            name="search[q]"
            id="search_q" />
            <input type="button" value="+" class="button-primary" onClick={() => {this.addOtherProfession()}} />
        </form>

      </div>
    );
  }

  handleInputChange(term) {
    this.props.onSearchTermChange(term);
  }

  addOtherProfession() {
    this.props.addOtherProfession();
  }
}
export default ProfessionSearchBar;
