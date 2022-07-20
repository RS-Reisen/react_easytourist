import {Component} from 'react';
import './App.css';
import InstagramService from './services/instagram';

class App extends Component {
  constructor() {
    super();
    this.state = {profile_info: null, media_info: null}
  }

  async componentDidMount() {
    let p_info = await InstagramService.getProfileInfo()
    let m_info = (await InstagramService.getMediaInfo()).splice(0, 9)
    this.setState({profile_info: p_info, media_info: m_info})
  }


  render() {
    return (
      <div className="App">
        <h1>{<a href={`https://instagram.com/${this.state.profile_info?.username}`}>{'@' + this.state.profile_info?.username}</a> || 'Loading'}</h1>
        <pre>account type: {this.state.profile_info?.account_type}, user id: {this.state.profile_info?.id}, {this.state.profile_info?.media_count} uploads</pre>

        <div id='instafeed'>
          {this.state.media_info?.map((media, i) => (
              <div className='ig-thumb' key={i}>
                <img className='ig-thumbnail' src={media.thumbnail_url || media.media_url} alt={media.caption}/>
                <div className='ig-caption-overlay'>
                    <p className='ig-caption'>{media.caption || `Image ${i}`}</p>
                    {/* <small>{media.id}, {media.media_type}, {media.timestamp}, {media.username}</small> */}
                    {/* eslint-disable-next-line */}
                    <a href={media.permalink} className='fa fa-instagram'></a>
                </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
