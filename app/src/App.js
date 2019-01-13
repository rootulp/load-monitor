import React, { Component } from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

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
        <LineChart width={400} height={400} data={this.state.data['data']}>
          <XAxis dataKey="time"/>
          <YAxis/>
          <Line type="monotone" dataKey="one_min" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

export default App;
