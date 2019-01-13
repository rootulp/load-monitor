import React, { Component } from 'react';
import './App.css';
import { LineChart, Line } from 'recharts';

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
        <p>
          {JSON.stringify(this.state.data)}
        </p>
        <LineChart width={400} height={400} data={this.state.data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

export default App;
