import React from 'react';
import axios from 'axios';
import AllTeamsElement from './AllTeamsElement.jsx';

class AllTeams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: []
    }
    this.getTeams = this.getTeams.bind(this);
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

  componentDidMount() {
    this.getTeams();
  }

  render() {
    return (
      <div>hey</div>
    )
  }
}

module.exports = AllTeams;