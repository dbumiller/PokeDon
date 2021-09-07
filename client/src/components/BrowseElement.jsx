import React from 'react';

class BrowseElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        {this.props.pokemon.name}
      </div>
    )
  }
}

module.exports = BrowseElement;