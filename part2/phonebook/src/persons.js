import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (contactData) => {
    return axios.post(baseUrl,contactData).then(response => response.data)
}

export default {getAll,create}