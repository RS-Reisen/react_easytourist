import { Component } from 'react'
import EasytouristService from './services/easytourist'
import { parseXml } from './utils/xmlUtils'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Chip, Grid, Card } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import { green } from '@mui/material/colors';
import parse from 'html-react-parser';

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
          <p><CheckCircleRoundedIcon sx={{ color: green[500], 'verticalAlign': 'middle' }} /> Initialized</p> :
          <p><CancelIcon color='error' sx={{ 'verticalAlign': 'middle' }} /> Not initialized</p>
        }

        {/* <pre>{JSON.stringify(Object.keys(this.state.xmlData?.EasytouristTransfer || {}), '\r\n', 2)}</pre> */}

        <Grid container spacing={2}>
          {this.state.xmlData &&
            this.state.xmlData.EasytouristTransfer.Reisen.Reise.map((reise, i) => (
              <Grid item xs={6} key={reise.ObjektID}>
                <Card>
                  <h2>{reise.Titel}</h2>

                  {reise.Typen.Typ.filter((typ) => JSON.parse(typ.Ausgewaehlt)).map((typ) => (
                    <Chip key={typ.Titel} label={typ.Titel} />
                  ))}

                  {parse(reise.Einfuehrung.html)}

                  {reise.Bilder.Bild?.map((bild, i) => (
                    <img key={bild.Sortierung} src={bild.URL} alt={bild.Titel} width='100px' />
                  ))}

                  {parse(reise.Beschreibung.html)}

                  <b>Leistungen:</b>
                  {parse(reise.Leistung.html)}

                  <b>Stornierungshinweis: </b>
                  {parse(reise.Stornierungshinweis.html)}
                  {/* <p>Termine: {reise.Termine.Termin.termin.Start} - {reise.Termine.Termin.termin.Ende} ({reise.Termine.Termin.termin.Tage} Tage)}</p> */}
                </Card>
              </Grid>
            ))
          }
        </Grid>


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