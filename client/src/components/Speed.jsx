import React from 'react';

class Speed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

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
      Speed
      <br></br>
      <button onClick={this.goBack}>Back</button>
      <ul className="speeds">
        {this.props.pokemon.map((pokemon, index) => {
          return (
            <div>
              {pokemon.name} {pokemon.speed}
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