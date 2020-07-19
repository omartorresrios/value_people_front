import React from 'react';

class InterestSearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        <form action="/search" acceptCharset="UTF-8" method="get">
          <input name="utf8" type="hidden" value="√" />
          <input
            onFocus={() => this.props.interestShowDropdown()}
            onBlur={() => this.props.interestHideDropdown()}
            value={this.props.interest}
            onChange={(event) => {this.handleInputChange(event.target.value)}}
            placeholder="Agrega un interés"
            autoComplete="off"
            type="search"
            name="search[q]"
            id="search_q" />
            <input type="button" value="+" class="button-primary" onClick={() => {this.addOtherInterest()}} />
        </form>

      </div>
    );
  }

  handleInputChange(term) {
    this.props.onSearchTermChange(term);
  }

  addOtherInterest() {
    this.props.addOtherInterest();
  }
}
export default InterestSearchBar;
