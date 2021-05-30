import axios from 'axios'
import {baseURL} from './Baseurl'
const instance =axios.create({
    baseURL : baseURL,
});

export default instance;