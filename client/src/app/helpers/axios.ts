import axiosMain from 'axios';
import { environment } from 'src/environment/environment';

const axios = axiosMain.create({
    baseURL: environment.serverUrl
});

export default axios;
