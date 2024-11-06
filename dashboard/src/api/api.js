import axios from "axios"

const api = axios.create({
    baseURL:"https://ecommerce-ils0.onrender.com/api"
})

export default api;