import axios from "axios";
const local = 'https://ecommerce-ils0.onrender.com'
const production = '';
const api = axios.create({
    baseURL : `${local}/api`
})

export default api;