import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000'
  //lembrar de alterar endereço
});

export default api;
