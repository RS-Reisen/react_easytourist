import { Component } from 'react'
import EasytouristService from './services/easytourist'
import { parseXml } from './utils/xmlUtils'
import { Card, CardContent, Typography, Grid, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import { green } from '@mui/material/colors';

export default class App extends Component {
  constructor() {
    super();
    this.state = { initialized: false, xmlData: null, open: false, selected: null }
  }

  handleClickOpen = (value) => {
    this.setState({ ...this.state, open: true, selected: value })
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false })
  };

  async componentDidMount() {
    const data = parseXml((await EasytouristService.getCatalog()).data)
    this.setState({ ...this.state, xmlData: data, initialized: true })
    console.log(data)
  }

  render() {
    return (
      <div className="App">
        <h1>Squarespace - Easytourist</h1>

        {this.state.initialized ?
          <p><CheckCircleRoundedIcon sx={{color: green[500], 'verticalAlign': 'middle'}}/> Initialized</p> :
          <p><CancelIcon color='error' sx={{'verticalAlign': 'middle'}}/> Not initialized</p>
        }

        <pre>{JSON.stringify(Object.keys(this.state.xmlData?.EasytouristTransfer || {}), '\r\n', 2)}</pre>

        <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Dialog</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {this.state.selected}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autofocus onClick={this.handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}