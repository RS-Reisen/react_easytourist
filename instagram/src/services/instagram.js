import axios from 'axios';

// const INSTAGRAM_URL = 'https://graph.instagram.com/'
const FACEBOOK_URL = 'https://graph.facebook.com/'

// Instagram @andreasnicklaus
// const PROFILE_ID = 17841406438473112

// Instagram @rs.reisen
const PROFILE_ID = 17841414836400318
const TOKEN = sessionStorage.getItem('token')

// class InstagramService {
//     getProfileInfo() {
//         return axios.get(INSTAGRAM_URL + PROFILE_ID, {params: {fields: 'account_type,id,media_count,username,media', access_token: ACCESS_TOKEN}})
//             .then((response) => {return response.data})
//             .catch((error) => {console.log(error); return null})
//     }

//     getMediaInfo() {
//         return axios.get(INSTAGRAM_URL + PROFILE_ID + '/media', {params: {fields: 'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username,children', access_token: ACCESS_TOKEN}})
//             .then((response) => {return response.data.data})
//             .catch((error) => {console.log(error); return null})
//     }

// }

class InstagramGraphAPI {
    getProfileInfo() {
        return axios.get(FACEBOOK_URL + PROFILE_ID, {params: {fields: 'biography,profile_picture_url,username, website,name,media_count,follows_count,followers_count,ig_id', access_token: TOKEN}})
            .then((response) => {return response.data})
            .catch((error) => {console.log(error); return null})
    }

    getMediaInfo() {
        return axios.get(FACEBOOK_URL + PROFILE_ID + '/media', {params: {fields: 'caption,children,media_type,product_tags,comments_count,is_comment_enabled,like_count,media_product_type,owner,permalink,shortcode,thumbnail_url,timestamp,username,comments,media_url', access_token: TOKEN}})
            .then((response) => {return response.data.data})
            .catch((error) => {console.log(error); return null})
    }

    getStories() {
        return axios.get(FACEBOOK_URL + PROFILE_ID + '/stories', {params: {fields: '', access_token: TOKEN}})
            .then((response) => {return response.data.data})
            .catch((error) => {console.log(error); return []})
    }
}

// export default new InstagramService();
export default new InstagramGraphAPI();