import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL_API;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';