import { api } from './utils';

export const getSettings = async () => {
    const { data } : any = await api.get('/settings');
    return data;
};

export const postSettings = async (settings : any = {}) => {
    const { data } : any = await api.post('/settings', {
        backgroundColor: '',
        defaultLanguage: '',
        defaultEventAction: ''
    });
    return data;
};