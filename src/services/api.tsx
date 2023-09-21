import axios from 'axios';

/* Definição da API */
/* No meu caso, foi utilizado um .env, a qual possuia a apiKey na variavel VITE_API_KEY */

const api = axios.create({
  baseURL: 'https://desafio-iall.azurewebsites.net/api',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

export default api;
