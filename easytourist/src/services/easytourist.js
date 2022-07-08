import axios from 'axios';

const BASE_URL = 'https://www.rs.reisen'
const BASIC_TOKEN = 'YS5uaWNrbGF1czphcnJvZ2FudC16eW5pc2NoLXRpZXI='

class EasytouristService {
    getCatalog() {
        return axios.get(
            // BASE_URL + 'katalog/export/export.xml',
            '/easytourist/katalog/export/export.xml',
            { headers: {
                Authorization: BASIC_TOKEN,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Referrer: 'https://www.rs.reisen'
            }, withCredentials: true
        }
        )
    }
}

export default new EasytouristService();