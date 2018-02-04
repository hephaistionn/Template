import axios from 'axios';

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});


export default {
    get: function get(url) {
        return axios.get(url);
    },
    put: function put(url, form, config) {
        return axios.put(url, form, config);
    },
    patch: function patch(url, form, config) {
        return axios.patch(url, form, config);
    },
    post: function post(url, formData, configData) {
        let form = formData;
        let config = configData;
        if (formData && formData.constructor.name === 'File') {
            form = new FormData();
            const name = Math.floor((1 + Math.random()) * 0x100000000000000).toString(16).substring(1);
            const extension = formData.name.split('.').pop();
            form.append('file', formData, name + '.' + extension);
            config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
        }
        return axios.post(url, form, config)
    },
    delete: function (url) {
        return axios.delete(url);
    }
};
