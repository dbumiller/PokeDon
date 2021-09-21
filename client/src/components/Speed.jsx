import React from 'react';

class Speed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      speeds: []
    }
    this.goBack = this.goBack.bind(this);
  }

  goBack(e) {
    e.preventDefault();
    this.props.changeView('home');
  }

  // componentDidMount() {
  //   var speeds = [];
  //   for (var i = 0; i < this.props.pokemon.length; i++) {
  //     speeds.push([this.props.pokemon[i].speed, this.props.pokemon[i].name]);
  //   }
  //   speeds.sort();
  //   this.setState({
  //     speeds: speeds
  //   })
  // }

  render() {
    var speeds = [];
    for (var i = 0; i < this.props.pokemon.length; i++) {
      speeds.push([this.props.pokemon[i].speed, this.props.pokemon[i].name]);
    }
    speeds.sort();

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