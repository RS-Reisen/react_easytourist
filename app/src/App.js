import { Component } from 'react'
import axios from 'axios'
import {parseXml} from './utils/xmlUtils'

class App extends Component {
  constructor() {
    super();
    this.state = { initialized: false, xmlData: null }
  }

  async componentDidMount() {
    this.setState({ ...this.state, initialized: true })
    const data = (await axios.get('/test.xml')).data
    this.setState({ ...this.state, xmlData: parseXml(data) })
    console.log(this.state.xmlData)
  }

  render() {
    return (
      <div className="App">
        <h1>Squarespace - Easytourist</h1>
        
        <p>{this.state.initialized ? "Initialized" : "Not initialized"}</p>
        
        { this.state.xmlData && Object.entries(this.state.xmlData).map(([key, value]) => {
          return (
          <div key={key}>
            <p>{key}</p>
            <p>{value.middle.bottom.text}</p>
          </div>
          )
        })}
        
      </div>
    );
  }
}

export default App;
