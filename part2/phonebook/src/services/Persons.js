import axios from 'axios';
const baseUrl = '/api/persons/';

const getAll = () => axios
                        .get(baseUrl)
                        .then(response => response.data);

const create = newName => axios
                            .post(baseUrl, newName)
                            .then(response => response.data);

const update = (name, id) => axios
                            .put(`${baseUrl}${id}`, name)
                            .then(response => response.data);

const deleteName = id => {
    axios.delete(`${baseUrl}${id}`)
}

export default { getAll, create, deleteName, update }