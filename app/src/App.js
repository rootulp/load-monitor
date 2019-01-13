import React, { Component } from 'react';
import './App.css';
import { CartesianGrid, LineChart, Line, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        currentTime: '',
        loadHistory: []
      };
  }

  componentDidMount() {
    fetch(`/data`)
      .then(response => response.json())
      .then(data => {
        console.info(data);
        this.setState({loadHistory: data.loadHistory})
       }
    );
  }

  render() {
    const { loadHistory, currentTime} = this.state;

    return (
      <div className="App">
      <h6>Key statistics</h6>
      {this.maybeRenderCurrentTime()}

      <h6>Load history</h6>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={800} height={400} data={this.filterToLastTenMins(loadHistory)} margin={{ top: 50, bottom: 50, left:50, right:50}}>
          <XAxis
            dataKey="time"
            tickFormatter = {(isoTime) => moment(isoTime).fromNow()}
          />
          <YAxis/>
          <Tooltip/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Legend />
          <Line type="monotone" dataKey="one_min" name="1 min avg" stroke="#8884d8" />
          <Line type="monotone" dataKey="five_min" name="5 min avg" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      </div>
    );
  }

  maybeRenderCurrentTime() {
    const {currentTime} = this.state
    if (currentTime !== '') {
      return (<ul><li>Current time: {moment(currentTime).toDate()}</li></ul>)
    }
  }

  filterToLastTenMins(loadHistory) {
    const DATA_POINTS_TO_KEEP = 6 * 10 // 6 points per min * 10 mins

    if (loadHistory !== undefined) {
      return loadHistory.slice(-DATA_POINTS_TO_KEEP, -1)
    }
  }
}

export default App;
