import React from 'react';
import axios from 'axios';

class Landing extends React.Component {
  constructor() {
    super();

    this.state = {
      teams: [],
      name: ''
    };

    this.getTeams = this.getTeams.bind(this);
    this.postTeam = this.postTeam.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  getTeams() {
    axios.get('/api/team')
    .then((results) => {
      this.setState({
        teams: results.data
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  postTeam(e) {
    e.preventDefault();
    axios.post('/api/team', {
      name: this.state.name
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount() {
    this.getTeams();
  }

  render() {
    return (
      // <div>
      //   <form>
      //     <label>Choose a team: </label>
      //     <select name="teams" id="teams">
      //       <option value="Sootopolis Squall">Squall</option>
      //       <option value="Black City Blitzkrieg">Blitzkrieg</option>
      //       <option value="Sevii Islands Swashbucklers">Swashbucklers</option>
      //       <option value="Pallet Town Pokemon Team">Pallet</option>
      //       <option value="Ballonlea Boomers">Boomers</option>
      //       <option value="Malie City Molasses">Molasses</option>
      //       <option value="Goldenrod City Goon Squad">Goonsquad</option>
      //       <option value="New Bark Town Knights">Knights</option>
      //       <option value="Vermillion City Veterans">Veterans</option>
      //       <option value="Viridian Forest Caterpie Massacre">Massacre</option>
      //     </select>
      //     <span> </span>
      //     <button tpye='submit'>Submit</button>
      //   </form>
      // </div>
      <div>
        <form>
          <label>Choose an existing team: </label>
          <select name="teams" id="teams">
            {this.state.teams.map((team, index) => {
              return (
                <option value={team.name} key={index}>{team.name}</option>
              )
            })}
          </select>
        </form>
        <form onSubmit={this.postTeam}>
          <label>Make a new team
            <input name="name" onChange={this.handleInput} value = {this.state.name} />
          </label>
          <button type='submit'>Create Team</button>
        </form>
      </div>
    )
  }
}

module.exports = Landing;