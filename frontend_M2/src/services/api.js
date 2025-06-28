import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
    );

    // Add response interceptor to handle errors
    this.api.interceptors.response.use(
        (response) => response.data,
        (error) => {
          const message = error.response?.data?.message || error.message || 'An error occurred';
          return Promise.reject(new Error(message));
        }
    );

  }

  async register(userData) {
    return this.api.post('/auth/register', userData);
  }

  async login(credentials) {
    return this.api.post('/auth/login', credentials);
  }

  async getProducts() {
    return this.api.get('/products');
  }

  async getProduct(id) {
    return this.api.get(`/products/${id}`);
  }

  async createProduct(productData) {
    return this.api.post('/products', productData);
  }

  async updateProduct(id, productData) {
    return this.api.put(`/products/${id}`, productData);
  }

  async deleteProduct(id) {
    return this.api.delete(`/products/${id}`);
  }

  async createOrder(orderData) {
    return this.api.post('/orders/add', orderData);
  }

  async getOrders() {
    return this.api.get('/orders');
  }

  async getOrder(id) {
    return this.api.get(`/orders/${id}`);
  }

  async updateOrder(id, orderData) {
    return this.api.put(`/orders/update/${id}`, orderData);
  }

  async deleteOrder(id) {
    return this.api.delete(`/orders/delete/${id}`);
  }

  async getUsers() {
    return this.api.get('/users');
  }

  async getUser(id) {
    return this.api.get(`/users/${id}`);
  }

  async updateUser(id, userData) {
    return this.api.put(`/users/${id}`, userData);
  }

  async deleteUser(id) {
    return this.api.delete(`/users/${id}`);
  }
}

export default new ApiService();