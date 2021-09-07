import React from 'react';

class MyTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        myteam
        {this.props.pokemon[0].name}
      </div>
    )
  }
}

module.exports = MyTeam;