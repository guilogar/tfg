import { getApi } from './utils';

export const getSettings = async () => {
    const api = getApi();
    const { data } : any = await api.get('/settings');
    return data;
};

export const postSettings = async (settings : any = {}) => {
    const api = getApi();
    const { data } : any = await api.post('/settings', {
        backgroundColor: '',
        defaultLanguage: '',
        defaultEventAction: ''
    });
    return data;
};