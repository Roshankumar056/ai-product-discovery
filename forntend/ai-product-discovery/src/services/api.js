import axios from 'axios';
import { mockProducts } from '../data/mockProducts';

const IS_OFFLINE = true; 
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 3000,
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => {
  try {
    if (IS_OFFLINE) throw new Error("Offline Mode");
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.warn("Using Mock Data: getProducts");
    await delay(800); 
    return mockProducts;
  }
};

export const askAI = async (query) => {
  try {
    if (IS_OFFLINE) throw new Error("Offline Mode");
    const response = await api.post('/ask', { query });
    return response.data;
  } catch (error) {
    console.warn("Using Mock Data: askAI");
    await delay(1200);
    
    const filtered = mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.tags.some(t => t.includes(query.toLowerCase()))
    );

    return {
      products: filtered,
      summary: `I found ${filtered.length} products that match your search for "${query}". These include the best options based on your preferences.`
    };
  }
};

export default api;