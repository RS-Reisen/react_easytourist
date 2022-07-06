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
    let m_info = await InstagramService.getMediaInfo()
    this.setState({profile_info: p_info, media_info: m_info})
  }


  render() {
    return (
      <div className="App">
        <h1>{this.state.profile_info?.username || 'Loading'}</h1>
        <pre>account type: {this.state.profile_info?.account_type}, user id: {this.state.profile_info?.id}, {this.state.profile_info?.media_count} uploads</pre>
        {/* <pre>{JSON.stringify(this.state.profile_info, null, 2)}</pre> */}

        {this.state.media_info?.map((media, i) => (
          <div key={i}>
            {/* {JSON.stringify(media)} */}
            <h2>{media.caption}</h2>
            <pre>{media.id}, {media.media_type}, {media.timestamp}, {media.username}</pre>
            <img src={media.media_url} alt={media.caption} width="100px"></img>
            <a href={media.permalink}>Mehr Information</a>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
