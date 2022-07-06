import { Component } from 'react'
import axios from 'axios'
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
    const data = parseXml((await axios.get('/test.xml')).data)
    this.setState({ ...this.state, xmlData: data, initialized: true })
    console.log(data)
  }

  render() {
    return (
      <div className="App">
        <h1>Squarespace - Easytourist</h1>

        {this.state.initialized ?
          <p><CheckCircleRoundedIcon sx={{color: green[500], 'vertical-align': 'middle'}}/> Initialized</p> :
          <p><CancelIcon color='error' sx={{'vertical-align': 'middle'}}/> Not initialized</p>
        }
        
        <Grid container spacing={2}>
          {this.state.xmlData && Object.entries(this.state.xmlData.content.top).map(([key, value]) => {
            return (
              <Grid item key={key} xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h1" component="div">
                      ID: {value.id || key}
                    </Typography>
                    <Typography variant="body">
                      {value.middle.bottom.text}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => this.handleClickOpen(value.middle.bottom.text)}>Mehr Info</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>

        <pre>{JSON.stringify(this.state.xmlData, '\r\n', 2)}</pre>

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