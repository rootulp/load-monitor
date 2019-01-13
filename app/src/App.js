import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            {JSON.stringify(this.state.data)}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
