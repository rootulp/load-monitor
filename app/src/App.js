import React, { Component } from 'react';
import './App.css';
import { CartesianGrid, LineChart, Line, Tooltip, Legend, XAxis, YAxis } from 'recharts';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        data: {}
      };
  }

  componentDidMount() {
    fetch(`/data`).then(response => response.json()).then(
      json => {
        console.log(json);
        this.setState({data: json});
      }
    );
  }

  render() {
    return (
      <div className="App">
      <h6>History of load</h6>
        <LineChart width={800} height={800} data={this.filterToLastTenMins(this.state.data['data'])} margin={{ top: 50, bottom: 50, left:50, right:50}}>
          <XAxis dataKey="time"/>
          <YAxis/>
          <Tooltip/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Legend />
          <Line type="monotone" dataKey="one_min" name="1 min avg" stroke="#8884d8" />
          <Line type="monotone" dataKey="five_min" name="5 min avg" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }

  filterToLastTenMins(data) {
    const DATA_POINTS_TO_KEEP = 6 * 10 // 6 points per min * 10 mins
    if (data !== undefined) {
      return data.slice(-DATA_POINTS_TO_KEEP, -1)
    }
  }
}

export default App;
