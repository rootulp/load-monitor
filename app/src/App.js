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
        <LineChart width={800} height={800} data={this.state.data['data']} margin={{ top: 50, bottom: 50, left:50, right:50}}>
          <XAxis dataKey="time"/>
          <YAxis/>
          <Tooltip/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Legend />
          <Line type="monotone" dataKey="one_min" stroke="#8884d8" />
          <Line type="monotone" dataKey="five_min" stroke="#82ca9d" />
          <Line type="monotone" dataKey="fifteen_min" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

export default App;
