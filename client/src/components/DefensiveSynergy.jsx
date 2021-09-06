import React from 'react';

class DefensiveSynergy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    console.log(this.props.defense);
    return (
      <div>
        defense
      </div>
    )
  }
}

module.exports = DefensiveSynergy;