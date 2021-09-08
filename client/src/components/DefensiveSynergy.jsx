import React from 'react';
import axios from 'axios';

class DefensiveSynergy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defenseChart: this.props.defense,
      allPokemon: []
    }
    this.getPokemon = this.getPokemon.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getPokemon() {
    axios.get('/api/pokemon')
      .then((results) => {
        this.setState({
          allPokemon: results.data
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  componentDidMount() {
    var defense = {};
    for (var key in this.state.defenseChart) {
      defense[key] = this.state.defenseChart[key];
    }

    for (var i = 0; i < this.props.pokemon.length; i++) {
      for (var key in defense) {
        if (this.props.pokemon[i].defensiveUtility) {
          for (var j = 0; j < this.props.pokemon[i].defensiveResist.length; j++) {
            if (key === this.props.pokemon[i].defensiveResist[j]) {
              defense[key]++;
            }
          }
        }

        for (var j = 0; j < this.props.pokemon[i].defensiveWeak.length; j++) {
          if (key === this.props.pokemon[i].defensiveWeak[j]) {
            defense[key]--;
          }
        }
      }
    }

    this.setState({
      defenseChart: defense
    })

    this.getPokemon();
  }


  goBack(e) {
    e.preventDefault();
    this.props.changeView('home');
  }

  render() {
    var output = '';
    for (var key in this.state.defenseChart) {
      output += key + ':  ' + this.state.defenseChart[key] + ', ';
    }

    return (
      <div>
        defense
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <div>
          {output}
        </div>
        <br></br>
        <button onClick={this.goBack}>Back</button>
      </div>
    )
  }
}

module.exports = DefensiveSynergy;