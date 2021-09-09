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

    var sortedChart = [];
    for (var key in this.state.defenseChart) {
      sortedChart.push([this.state.defenseChart[key], key]);
    }

    sortedChart.sort(function(b, a) {
      if (a[0] > b[0]) {
        return -1;
      } else if (a[0] < b[0]) {
        return 1;
      } else {
        return 0;
      }
    });

    var sum = 0;
    for (var i = 0; i < sortedChart.length; i++) {
      sum += sortedChart[i][0];
    }
    var average = sum / 18;

    for (var i = 0; i < sortedChart.length; i++) {
      sortedChart[i][0] -= average;
    }
    console.log(sortedChart);

    var belowAverage = [];
    var bottomFour = [];
    var aboveAverage = [];

    for (var i = 0; i < sortedChart.length; i++) {
      // if (sortedChart[i][0] <= sortedChart[5][0]) {
        if (sortedChart[i][0] < 0) {
        belowAverage.push([sortedChart[i][0], sortedChart[i][1]]);
      }
      if (sortedChart[i][0] <= sortedChart[3][0]) {
        bottomFour.push([sortedChart[i][0], sortedChart[i][1]]);
      }
      if (sortedChart[i][0] > 0) {
        aboveAverage.push([sortedChart[i][0], sortedChart[i][1]]);
      }
    }

    console.log(bottomFour);
    console.log(belowAverage);
    console.log(aboveAverage);

    var arrayForSorting = [];
    for (var i = 0; i < this.state.allPokemon.length; i++) {
      var current = [];
      var bottomFourValue = 0;
      var belowAverageCount = 0;
      var aboveAverageValue = 0;

      for (var j = 0; j < bottomFour.length; j++) {
        for (var k = 0; k < this.state.allPokemon[i].defensiveResist.length; k++) {
          if (bottomFour[j][1] === this.state.allPokemon[i].defensiveResist[k]) {
            bottomFourValue -= bottomFour[j][0];
          }
        }
        for (var k = 0; k <this.state.allPokemon[i].defensiveWeak.length; k++) {
          if (bottomFour[j][1] === this.state.allPokemon[i].defensiveWeak[k]) {
            bottomFourValue += bottomFour[j][0];
          }
        }
      }

      for (var j = 0; j < belowAverage.length; j++) {
        for (var k = 0; k < this.state.allPokemon[i].defensiveResist.length; k++) {
          if (belowAverage[j][1] === this.state.allPokemon[i].defensiveResist[k]) {
            belowAverageCount++;
          }
        }
      }

      for (var j = 0; j < aboveAverage.length; j++) {
        // for (var k = 0; k < this.state.allPokemon[i].defensiveResist.length; k++) {
        //   if (aboveAverage[j][1] === this.state.allPokemon[i].defensiveResist[k]) {
        //     aboveAverageValue -= aboveAverage[j][0];
        //   }
        // }
        for (var k = 0; k <this.state.allPokemon[i].defensiveWeak.length; k++) {
          if (aboveAverage[j][1] === this.state.allPokemon[i].defensiveWeak[k]) {
            aboveAverageValue += aboveAverage[j][0];
          }
        }
      }


      // console.log(this.state.allPokemon[i].name, bottomFourValue, belowAverageCount);
      console.log(this.state.allPokemon[i].name, aboveAverageValue);
    }



    return (
      <div>
        Defense: Below is your team's type chart followed by a list of pokemon sorted by how much they fill your team's defensive needs. The numbers for any given pokemon are sorted by importance, with most important on the left. The first number for each pokemon is weighted and represents how the pokemon fills in your defense against your biggest type weaknesses. The second number is weighted and represents how much the pokemon takes advantage of your team's defensive strengths. The third number is not weighted and represents how many of your below-average defensive matchups the pokemon resists.
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