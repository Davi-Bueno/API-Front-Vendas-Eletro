import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

// Configuração do axios com o token de autenticação
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar o token de autenticação em todas as requisições
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const userLogin = async (data) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarClientes = async () => {
  try {
    const response = await axiosInstance.get("/clientes");
    return response.data; // Retornamos apenas os dados da resposta
  } catch (error) {
    throw error;
  }
};
//get por id
/*
export const getClienteById = async (id) => {
  try {
    const response = await axiosInstance.get(`/clientes/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
*/
export const updateCliente = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/clientes/${id}`, data);
    console.log("Resposta do servidor (updateCliente):", response);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição updateCliente:", error);
    throw error;
  }
};

export const deletarCliente = async (id) => {
  try {
    const response = await axiosInstance.delete(`/clientes/${id}`);
    return response.data; // Retornamos apenas os dados da resposta
  } catch (error) {
    throw error;
  }
};

export const criarCliente = async (data) => {
  try {
    const response = await axiosInstance.post("/clientes", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;


