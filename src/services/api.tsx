import axios from 'axios';

const api = axios.create({
  baseURL: 'https://desafio-iall.azurewebsites.net/api', // Use a URL base da sua API
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`, // Adicione sua apiKey como cabeçalho, se necessário
  },
});

export default api;
