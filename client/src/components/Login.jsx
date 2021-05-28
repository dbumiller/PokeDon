import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <form>
          <label>Choose a team: </label>
          <select name="teams" id="teams">
            <option value="Sootopolis Squall">Squall</option>
            <option value="Black City Blitzkrieg">Blitzkrieg</option>
            <option value="Sevii Islands Swashbucklers">Swashbucklers</option>
            <option value="Pallet Town Pokemon Team">Pallet</option>
            <option value="Ballonlea Boomers">Boomers</option>
            <option value="Malie City Molasses">Molasses</option>
            <option value="Goldenrod City Goon Squad">Goonsquad</option>
            <option value="New Bark Town Knights">Knights</option>
            <option value="Vermillion City Veterans">Veterans</option>
            <option value="Viridian Forest Caterpie Massacre">Massacre</option>
          </select>
          <span> </span>
          <button tpye='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

module.exports = Login;