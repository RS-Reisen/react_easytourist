import { Component } from 'react'
import EasytouristService from './services/easytourist'
import { parseXml } from './utils/xmlUtils'
import { Grid } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import { green } from '@mui/material/colors';
import TravelCard from './components/TravelCard'
import SearchBar from './components/searchBar';

import styled from 'styled-components'

const Title = styled.h1`
  color: red;

  &:hover {
    color: black;
  }
`

export default class App extends Component {
  constructor() {
    super();
    this.state = { initialized: false }
  }

  async componentDidMount() {
    // Parse XML from the catalog to JSON
    const data = parseXml((await EasytouristService.getCatalog()).data)
    console.log(data)
  
    // Read the search parameters from the URL
    const params = new URLSearchParams(window.location.search)

    this.setState({
      ...this.state,
      travelData: data,
      initialized: true,
      destination: params.getAll('destination'),
      travelDate: this.generateTravelDateFromParam(params.get('travelDate'))
    })
    console.log(this.state)
  }

  generateTravelDateFromParam(param) {
    console.log('travelDate', JSON.stringify(param))
    if (param === null) return new Date().toISOString().split('T')[0]
    if (param === '') return null
    return param
  }

  filterReisen = (reise) => {
    return (
      // reise starts today or after today
      (new Date(reise.Termine.Termin.Start) - new Date(this.state.travelDate)) > -1
      && (
        // destinations are not empty and reise.Ziel has a intersection with the destinations
        this.state.destination.length === 0
        || this.state.destination[0] === ''
        || this.state.destination.some(dest =>
          dest !== ''
          && (dest.toLowerCase().includes(reise.Ziel.Stadt.toLowerCase()) || reise.Ziel.Stadt.toLowerCase().includes(dest.toLowerCase())
            || dest.toLowerCase().includes(reise.Ziel.Land.toLowerCase()) || reise.Ziel.Land.toLowerCase().includes(dest.toLowerCase()))
        )
      )
    )
  }

  render() {
    return (
      <div className="App">
        <Title>Squarespace - Easytourist</Title>

        {this.state.initialized ?
          <p><CheckCircleRoundedIcon sx={{ color: green[500], 'verticalAlign': 'middle' }} /> Initialized</p> :
          <p><CancelIcon color='error' sx={{ 'verticalAlign': 'middle' }} /> Not initialized</p>
        }

        <SearchBar/>

        <Grid container spacing={2}>
          {this.state.travelData &&
            this.state.travelData.EasytouristTransfer.Reisen.Reise
            .filter(this.filterReisen)
            .sort((a, b) => {
              return (new Date(a.Termine.Termin.Start) - new Date(b.Termine.Termin.Start))
            })
            .map((reise) => (
              <Grid item xl={3} md={4} sm={6} xs={12} key={reise.Termine.Termin.Start} style={{display: 'grid', placeItems: 'center'}}>
                <TravelCard reise={reise}/>
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
}