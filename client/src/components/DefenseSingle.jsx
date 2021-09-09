import React from 'react';

class DefenseSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    // console.log(this.props.pokemon[0]);
    return (
      <div>
        {this.props.pokemon[0]} Defense: {this.props.pokemon[1]} , {this.props.pokemon[2]}, {this.props.pokemon[3]}
        <br></br>
      </div>
    )
  }
}

module.exports = DefenseSingle;