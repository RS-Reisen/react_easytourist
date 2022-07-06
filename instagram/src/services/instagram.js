import axios from 'axios';

const INSTAGRAM_URL = 'https://graph.instagram.com/'
const PROFILE_ID = 17841406438473112
const ACCESS_TOKEN = 'IGQVJYVGYxZA0xwNG9rZA0ZAPQkJoTEo0SC05cTE2eVVJSnp6ck5fN0NVM19GeVBUcm03VWVyZAWNYcHprZAWJhMDJzVXZAVNTNSck02ZAzJvWkZABZAS1Ob3dPUVRIamZAUMERGblA1NzAwMUU3V1V3cktHQ0tSSFFNQzQyb0k2ZAWFV'

class InstagramService {
    getProfileInfo() {
        return axios.get(INSTAGRAM_URL + PROFILE_ID, {params: {fields: 'account_type,id,media_count,username,media', access_token: ACCESS_TOKEN}})
            .then((response) => {return response.data})
            .catch((error) => {console.log(error); return null})
    }

    getMediaInfo() {
        return axios.get(INSTAGRAM_URL + PROFILE_ID + '/media', {params: {fields: 'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username,children', access_token: ACCESS_TOKEN}})
            .then((response) => {return response.data.data})
            .catch((error) => {console.log(error); return null})
    }
}

export default new InstagramService();