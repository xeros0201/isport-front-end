import _axios from 'axios';

const axios = _axios.create({
    url: 'http://localhost:3000/api'
});

export default axios;