import React from 'react';
import MyTeamElement from './MyTeamElement.jsx';

class MyTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: this.props.pokemon
    }
    this.goBack = this.goBack.bind(this);
  }

  goBack(e) {
    e.preventDefault();
    this.props.changeView('home');
  }

  render() {
    return (
      <div>
        {this.props.teamName}
        <br></br>
        myteam
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <ul className="pokemon">
          {this.state.pokemon.map((pokemon, index) => {
            return (
              <MyTeamElement pokemon={pokemon} key={index} teamId={this.props.teamId} />
            )
          })}
        </ul>
        <button onClick={this.goBack}>Back</button>
      </div>
    )
  }
}

module.exports = MyTeam;