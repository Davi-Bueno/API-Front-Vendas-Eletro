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

// Funções para clientes
export const listarClientes = async () => {
  try {
    const response = await axiosInstance.get("/clientes");
    return response.data;
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    throw error;
  }
};

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
    return response.data;
  } catch (error) {
    console.error("Erro na requisição deletarCliente:", error);
    throw error;
  }
};

export const criarCliente = async (data) => {
  try {
    const response = await axiosInstance.post("/clientes", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funções para eletrodomésticos
export const listarEletrodomesticos = async () => {
  try {
    const response = await axiosInstance.get("/eletro");
    return response.data;
  } catch (error) {
    console.error('Erro ao listar eletrodomésticos:', error);
    throw error;
  }
};

export const getEletrodomesticoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/eletro/id?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar eletrodoméstico por ID:', error);
    throw error;
  }
};

export const criarEletrodomestico = async (data) => {
  try {
    const response = await axiosInstance.post("/eletro", data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar eletrodoméstico:', error);
    throw error;
  }
};

export const updateEletrodomestico = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/eletro/${id}`, data);
    console.log("Resposta do servidor (updateEletrodomestico):", response);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição updateEletrodomestico:", error);
    throw error;
  }
};

export const deletarEletrodomestico = async (id) => {
  try {
    const response = await axiosInstance.delete(`/eletro/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição deletarEletrodomestico:", error);
    throw error;
  }
};

// Funções para vendedores
export const listarVendedores = async () => {
  try {
    const response = await axiosInstance.get("/vendedor");
    return response.data;
  } catch (error) {
    console.error('Erro ao listar vendedores:', error);
    throw error;
  }
};

export const criarVendedor = async (data) => {
  try {
    const response = await axiosInstance.post("/vendedor", data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar vendedor:', error);
    throw error;
  }
};

export const updateVendedor = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/vendedor/${id}`, data);
    console.log("Resposta do servidor (updateVendedor):", response);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição updateVendedor:", error);
    throw error;
  }
};

export const deletarVendedor = async (id) => {
  try {
    const response = await axiosInstance.delete(`/vendedor/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição deletarVendedor:", error);
    throw error;
  }
};

export default axiosInstance;


