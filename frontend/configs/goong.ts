
import axios from 'axios';
import { GOONG_API_KEY, GOONG_API_URL } from './env';

const goongAxios = axios.create({
  baseURL: GOONG_API_URL,
  params: {
    api_key: GOONG_API_KEY,
  },
});

export default goongAxios;
