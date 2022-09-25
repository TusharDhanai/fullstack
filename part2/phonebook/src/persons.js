import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (contactData) => {
    return axios.post(baseUrl,contactData).then(response => response.data)
}

const delContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then()
}

const update = (id,contactData) => {
    return axios
    .put(`${baseUrl}/${id}`,contactData)
    .then(() => getAll())
}

export default {getAll,create,delContact,update}