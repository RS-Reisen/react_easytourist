import { Component } from 'react'
import EasytouristService from './services/easytourist'
import { parseXml } from './utils/xmlUtils'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import { green } from '@mui/material/colors';
import parse from 'html-react-parser';
import './travel-card.css'

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
            this.state.xmlData.EasytouristTransfer.Reisen.Reise.sort((a, b) => {
              return (new Date(a.Termine.Termin.Start) - new Date(b.Termine.Termin.Start))
            }).map((reise, i) => (
              <Grid item xs={6} key={reise.Termine.Termin.Start}>
                <div class="travel-box rs-reisen-outline" key={reise.ObjektID}>
                  <div class="travel-img rs-reisen-overlay"></div>
                  <div class="heading">
                    <h2 class="heading_destination">{reise.Ziel.Stadt}</h2>
                    <h3 class="heading_description">{reise.Titel}</h3>
                  </div>
                  <div class="description">
                    <div class="description_text">
                    {parse(reise.Einfuehrung.html)}
                    </div>
                    { reise.Termine.Termin && <p class="description_travel-dates">
                      {reise.Termine.Termin.Tage} Tag{(reise.Termine.Termin.Tage > 1) ? 'e' : ''}: <br />
                      {new Date(reise.Termine.Termin.Start).toLocaleDateString('de')} - {new Date(reise.Termine.Termin.Ende).toLocaleDateString('de')}
                    </p>}
                  </div>
                  <div class="pricing">
                    <p class="pricing_prefix">ab</p>
                    <p class="pricing_price">950€</p>
                  </div>
                  <svg
                    class="rs-reisen-logo_visible"
                    width="65"
                    height="66"
                    viewBox="0 0 65 66"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.22389 37.285C8.60467 29.7259 12.2155 22.1428 18.4611 17.0701C23.3973 13.0663 29.9682 10.8322 36.317 11.8652C39.2929 12.3536 42.2689 13.9151 43.4831 16.8579C44.7846 20.0609 43.3244 23.6162 41.0428 25.9464C38.2494 28.8251 34.2179 29.782 30.8332 31.7398C27.4486 33.6977 24.4845 36.6725 23.0044 40.376C21.5244 44.0794 21.5641 48.5797 23.6988 52.0189C25.7463 55.31 29.6032 57.3759 33.464 56.8234C44.2053 55.278 45.2806 40.1397 47.6614 31.88C49.4837 25.5536 52.8683 19.7978 57.498 15.1523C58.5376 14.1147 59.6359 13.1388 60.7874 12.2295C55.3753 5.82643 47.8488 1.61686 39.5992 0.37898C31.3497 -0.858897 22.9349 0.958625 15.9104 5.49556C8.88593 10.0325 3.72679 16.9821 1.38669 25.0595C-0.953404 33.137 -0.316218 41.7963 3.18046 49.4365C3.95375 45.3284 4.97005 41.2706 6.22389 37.285Z"
                      fill="#55D688"
                    />
                    <path
                      d="M55.7093 23.2196C52.3207 28.4485 50.9716 34.0938 49.4836 40.0594C47.2615 48.9638 43.1348 60.9911 31.8737 60.3064C25.0568 59.9061 19.8984 54.2207 19.1127 47.5585C18.2557 40.2836 22.3149 33.6294 28.1597 29.6256C31.3341 27.4716 35.2505 26.6148 38.2542 24.2325C41.258 21.8503 42.2222 17.3701 37.9844 15.7206C32.0801 13.4224 24.6639 16.3772 20.2158 20.3769C14.9186 25.1454 11.8593 31.8277 9.78405 38.55C8.65714 42.2014 7.80006 45.953 7.00647 49.6965C6.67114 51.194 6.43256 52.712 6.29224 54.2407C8.77205 58.2021 12.0184 61.6179 15.8371 64.2838C19.6557 66.9497 23.6116 65.055 28.1597 66C33 66 36.5 66 42 66C46.5518 65.0733 51.1781 67.0129 55.0072 64.3624C58.8363 61.7119 62.0962 58.3092 64.5916 54.3578C64.5916 49.6965 62.4215 46.6217 63.185 42C63.9485 37.3783 64.2752 32.5544 63.185 28C62.0947 23.4456 65.955 18.6202 63.185 14.8597C60.2859 17.2462 57.7649 20.0653 55.7093 23.2196Z"
                      fill="#55D688"
                    />
                  </svg>
                </div>
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