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
    speeds.sort(function (a, b) {
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

    if (speeds.length > 0) {
      if (speeds[0][0] < 105) {
        gaps.push([200, 104, []]);
        for (var j = 0; j < this.state.pokemon.length; j++) {
          if (this.state.pokemon[j].speed >= 104) {
            gaps[k][2].push(this.state.pokemon[j]);
          }
        }
        gaps[k][2].sort(function (a, b) {
          if (Number(a.speed) > Number(b.speed)) {
            return -1;
          } else if (Number(a.speed) < Number(b.speed)) {
            return 1;
          } else {
            return 0;
          }
        });
        k++;
      }
    }

    for (var i = 1; i < speeds.length; i++) {
      if (speeds[i - 1][0] <= 110 && (speeds[i - 1][0] - speeds[i][0] >= 15) && speeds[i][0] >= 40) {
        gaps.push([speeds[i - 1][0], speeds[i][0], []]);

        for (var j = 0; j < this.state.pokemon.length; j++) {
          if (this.state.pokemon[j].speed < speeds[i - 1][0] && this.state.pokemon[j].speed > speeds[i][0]) {
            gaps[k][2].push(this.state.pokemon[j]);
          }
        }
        gaps[k][2].sort(function (a, b) {
          if (Number(a.speed) > Number(b.speed)) {
            return -1;
          } else if (Number(a.speed) < Number(b.speed)) {
            return 1;
          } else {
            return 0;
          }
        });
        k++;
      }
    }


    var nextIsForty = false;

    var nextIsForty = false;
    var lower;
    for (var i = 0; i < speeds.length; i++) {
      if (speeds[i][0] > 40) {
        lower = speeds[i][0];
      } else if (speeds[i][0] === 40) {
        nextIsForty = true;
      }
    }

    if (lower > 55 && !nextIsForty) {
      gaps.push([lower, 40, []]);
      for (var j = 0; j < this.state.pokemon.length; j++) {
        if (this.state.pokemon[j].speed > 40 && this.state.pokemon[j].speed < lower) {
          gaps[k][2].push(this.state.pokemon[j]);
        }
      }
      gaps[k][2].sort(function (a, b) {
        if (Number(a.speed) > Number(b.speed)) {
          return -1;
        } else if (Number(a.speed) < Number(b.speed)) {
          return 1;
        } else {
          return 0;
        }
      });
      k++;
    }



    if (this.props.pokemon.length <= 3) {
      return (
        <div>
          Speed Tiers
          <br></br>
          <button onClick={this.goBack}>Back</button>
          <br></br>
          You're doing great so far, check back after picking another pokemon or two!
          <br></br>
          <button onClick={this.goBack}>Back</button>
        </div>
      )
    }

    return (
      <div>
        Speed Tiers
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
        <ul className="gaps">
          {gaps.map((gap, gapIndex) => {
            return (
              <li key={gapIndex}>
                {gap[0]} - {gap[1]}
                <ul className="gapFiller">
                  {gap[2].map((filler, fillerIndex) => {
                    return (
                      <div key={fillerIndex}>
                        {filler.name} {filler.speed}
                      </div>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
        <button onClick={this.goBack}>Back</button>
      </div>
    )
  }
}

module.exports = Speed;