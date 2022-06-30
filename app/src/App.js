import {Component} from 'react'

class App extends Component {
  constructor() {
    super();
    this.state = { initialized: false }
  }

  componentDidMount() {
    this.setState({initialized: true})
  }

  render() {
    return (
      <div className="App">
        <h1>Squarespace - Easytourist</h1>
        <p>{this.state.initialized ? "Initialized": "Not initialized"}</p>
      </div>
    );
  }
}

export default App;
