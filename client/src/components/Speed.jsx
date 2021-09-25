import React from 'react';
import axios from 'axios';

class Speed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      speeds: [],
      pokemon: []
    }
    this.goBack = this.goBack.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
  }

  goBack(e) {
    e.preventDefault();
    this.props.changeView('home');
  }

  getPokemon() {
    axios.get('/api/pokemon')
      .then((results) => {
        this.setState({
          pokemon: results.data,
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.getPokemon();
  }

  render() {
    var speeds = [];
    for (var i = 0; i < this.props.pokemon.length; i++) {
      speeds.push([this.props.pokemon[i].speed, this.props.pokemon[i].name]);
    }
    speeds.sort(function(a, b) {
      if (Number(a[0]) > Number(b[0])) {
        return -1;
      } else if (Number(a[0]) < Number(b[0])) {
        return 1;
      } else {
        return 0;
      }
    });

    var gaps = [];
    var k = 0;
    for (var i = 1; i < speeds.length; i++) {
      if (speeds[i - 1][0] <= 115 && (speeds[i - 1][0] - speeds[i][0] >= 15)) {
        gaps.push([speeds[i - 1][0], speeds[i][0], []]);

        for (var j = 0; j < this.state.pokemon.length; j++) {
          if (this.state.pokemon[j].speed < speeds[i - 1][0] && this.state.pokemon[j].speed > speeds[i][0]) {
            gaps[k][2].push(this.state.pokemon[j]);
          }
        }
        k++;
      }
    }
    console.log(gaps);




    return (
    <div>
      Speed
      <br></br>
      <button onClick={this.goBack}>Back</button>
      <ul className="speeds">
        {speeds.map((pokemon, index) => {
          return (
            <div key={index}>
              {pokemon[1]} {pokemon[0]}
            </div>
          )
        })}
      </ul>
      <button onClick={this.goBack}>Back</button>
    </div>
    )
  }
}

module.exports = Speed;