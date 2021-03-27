import axios from 'axios';
import { ENV } from '../env';

export const getSettings = async () => {
    const { data } : any = await axios.get(ENV.BACKEND_HOST + '/settings');
    return data;
};

export const postSettings = async (settings : any = {}) => {
    const { data } : any = await axios.post(ENV.BACKEND_HOST + '/settings', {
        backgroundColor: '',
        defaultLanguage: '',
        defaultEventAction: ''
    });
    return data;
};