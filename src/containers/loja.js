import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppAppBar from "../components/AppAppBar";
import MainContent from "../components/MainContent";
import Latest from "../components/Latest";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import getBlogTheme from "../theme/getBlogTheme";
import { useNavigate } from "react-router-dom";
import { listarClientes, criarCliente, deletarCliente, updateCliente } from "../axios";
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FogaoImg from "../theme/fotos/Fogao.png";
import GeladeiraImg from "../theme/fotos/Geladeria.png";

const LOJA_TIMEOUT = 30 * 60 * 1000; // 30 minutos em milissegundos

const getCurrentDate = () => {
  return new Date().toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const newCardData = [
  {
    img: FogaoImg,
    tag: "Cozinha Profissional",
    title: "Fogão de Alta Performance",
    description:
      "Apresentamos o nosso fogão de última geração, projetado para chefs profissionais e entusiastas da culinária. Com 4 bocas de alta potência, forno de convecção e sistema de segurança avançado, este fogão combina tecnologia de ponta com design elegante. Prepare refeições gourmet com precisão e eficiência incomparáveis.",
    authors: [
      { name: "Chef Mariana", avatar: "/static/images/avatar/1.jpg" },
      { name: "Eng. Roberto", avatar: "/static/images/avatar/2.jpg" },
    ],
    date: getCurrentDate(),
  },
  {
    img: GeladeiraImg,
    tag: "Refrigeração Inteligente",
    title: "Geladeira Smart Eco-Friendly",
    description:
      "Conheça nossa geladeira inteligente e ecológica. Com tecnologia de refrigeração adaptativa, compartimentos flexíveis e conectividade Wi-Fi, esta geladeira se ajusta aos seus hábitos alimentares, reduzindo o desperdício e o consumo de energia. O design elegante e espaçoso complementa qualquer cozinha moderna, tornando-a o centro das atenções do seu lar.",
    authors: [
      {
        name: "Dra. Camila Sustentável",
        avatar: "/static/images/avatar/6.jpg",
      },
      { name: "Designer Lucas", avatar: "/static/images/avatar/3.jpg" },
    ],
    date: getCurrentDate(),
  },
];

export default function Loja() {
  const navigate = useNavigate();

  //tema
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  //atividade e navegação
  const [lastActivity, setLastActivity] = React.useState(Date.now());
  //selecionar cliente $ instância do cliente
  const [clients, setClients] = React.useState([]);
  const [currentClient, setCurrentClient] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [error, setError] = React.useState(null);
  //modal editor para editor de clientes
  const [openModal, setOpenModal] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  //criar
  const [newClient, setNewClient] = React.useState({
    nome: "",
    contato: "",
    email: "",
    CPF: "",
  });
  //deletar cliente
  
//edit

  //pos criacao
  const [isCreating, setIsCreating] = React.useState(false);
  //aviso de sucess
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  //função pra abrir o modal
  const handleOpenModal = (mode) => {
    setEditMode(mode === "edit");
    setOpenModal(true);
    if (mode === "create") {
      setIsCreating(true);
      setNewClient({ nome: "", contato: "", email: "", CPF: "" });
    } else {
      setIsCreating(false);
    }
  };
  //função para fechar o modal
  const handleCloseModal = () => {
    setEditMode(false);
    setOpenModal(false);
    setIsCreating(false);
  };
  //f
  const handleEditClient = async () => {
    console.log("handleEditClient chamado");
    if (!currentClient || !currentClient.ID_Cliente) {
      console.error("Nenhum cliente selecionado para editar");
      return;
    }

    console.log("Cliente a ser atualizado:", currentClient);

    try {
      const response = await updateCliente(currentClient.ID_Cliente, {
        nome: currentClient.nome,
        contato: currentClient.contato,
        email: currentClient.email,
        CPF: currentClient.CPF
      });
      console.log("Resposta da atualização:", response);

      // Atualizar a lista de clientes
      const updatedClientsList = await listarCliente();
      console.log("Lista de clientes atualizada:", updatedClientsList);

      if (Array.isArray(updatedClientsList)) {
        setClients(updatedClientsList);

        // Atualizar o cliente atual
        const updatedCurrentClient = updatedClientsList.find(client => client.ID_Cliente === currentClient.ID_Cliente);
        if (updatedCurrentClient) {
          setCurrentClient(updatedCurrentClient);
        }
      } else {
        console.error("A lista de clientes atualizada não é um array:", updatedClientsList);
      }

      // Fechar o modal
      handleCloseModal();

      // Mostrar mensagem de sucesso
      setSnackbarMessage("Cliente atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      setError("Erro ao atualizar cliente. Verifique o console.");
      setSnackbarMessage("Erro ao atualizar cliente. Tente novamente.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCreateClient = async () => {
    try {
      const response = await criarCliente(newClient);
      console.log("Novo cliente criado:", response.data);

      // Atualizar a lista de clientes
      await listarCliente();

      // Fechar o modal e resetar o estado
      handleCloseModal();
      setNewClient({ nome: "", contato: "", email: "", CPF: "" });
      setSnackbarMessage("Cliente criado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao criar novo cliente:", error);
      setError("Erro ao criar novo cliente. Verifique o console.");

      setSnackbarMessage("Erro ao criar novo cliente. Tente novamente.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleDeleteClient = async () => {
    if (!currentClient || !currentClient.ID_Cliente) {
      console.error("Nenhum cliente selecionado para deletar");
      return;
    }
    
    const isConfirmed = window.confirm(`Tem certeza que deseja deletar o cliente ${currentClient.nome}?`);
    
    if (!isConfirmed) {
      return;
    }

    try {
      const result = await deletarCliente(currentClient.ID_Cliente);
      console.log("Resposta do servidor:", result);

      // Atualizar lista
      await listarCliente();

      // Aviso de delete com sucesso
      setSnackbarMessage("Cliente deletado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Atualizar cliente atual
      if (clients.length > 1) {
        const newIndex = Math.min(currentIndex, clients.length - 2);
        setCurrentIndex(newIndex);
        setCurrentClient(clients[newIndex]);
      } else {
        setCurrentClient(null);
        setCurrentIndex(-1);
      }

      // Fechar o modal
      handleCloseModal();

    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      
      let errorMessage = "Erro ao deletar cliente. Tente novamente.";
      
      if (error.response) {
        console.error("Resposta do servidor:", error.response.data);
        errorMessage = `Erro ao deletar cliente: ${error.response.data.message || error.response.data}`;
      } else if (error.request) {
        console.error("Sem resposta do servidor");
        errorMessage = "Erro ao deletar cliente: Sem resposta do servidor";
      } else {
        console.error("Erro:", error.message);
        errorMessage = `Erro ao deletar cliente: ${error.message}`;
      }
      
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const resetTimer = () => {
    setLastActivity(Date.now());
  };

  const checkInactivity = () => {
    const currentTime = Date.now();
    if (currentTime - lastActivity > LOJA_TIMEOUT) {
      navigate("/login");
    }
  };

  React.useEffect(() => {
    const interval = setInterval(checkInactivity, 1000); // Verifica a cada segundo
    
    // Adiciona listeners para eventos de interação do usuário
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [lastActivity, navigate]);

  // Reseta o timer quando o componente monta
  React.useEffect(() => {
    resetTimer();
  }, []);

  //tema
  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  //função de listar CLientes
  const listarCliente = async () => {
    try {
      const response = await listarClientes();
      console.log("Resposta de listarClientes:", response);

      if (response && Array.isArray(response.recordset)) {
        setClients(response.recordset);
        if (response.recordset.length > 0) {
          setCurrentClient(response.recordset[0]);
          setCurrentIndex(0);
          setError(null);
        } else {
          setError("Nenhum cliente encontrado.");
          setCurrentClient(null);
          setCurrentIndex(-1);
        }
      } else {
        console.error("Resposta inválida de listarClientes:", response);
        setError("Erro ao listar clientes. Formato de resposta inválido.");
        setClients([]);
        setCurrentClient(null);
        setCurrentIndex(-1);
      }
      return response.recordset || [];
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      setError("Erro ao listar clientes. Verifique o console.");
      setClients([]);
      setCurrentClient(null);
      setCurrentIndex(-1);
      return [];
    }
  };

  const nextClient = () => {
    if (currentIndex < clients.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setCurrentClient(clients[currentIndex + 1]);
    }
  };

  const prevClient = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setCurrentClient(clients[currentIndex - 1]);
    }
  };

  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
      <CssBaseline />
      <NavBar
        toggleCustomTheme={toggleCustomTheme}
        showCustomTheme={showCustomTheme}
        mode={mode}
        toggleColorMode={toggleColorMode}
      />
      <AppAppBar
        onEntrarClick={listarCliente}
        entrar="Listar"
        onCadastrarClick={handleLogout}
        cadastrar="Sair"
      />
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 24,
          mb: 16,
          gap: 4,
        }}
      >
        {currentClient && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Clientes Cadastrados (Páginas: {currentIndex + 1} de{" "}
              {clients.length})
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  value={currentClient.nome || ""}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contato"
                  value={currentClient.contato || ""}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={currentClient.email || ""}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CPF"
                  value={currentClient.CPF || ""}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Button onClick={prevClient} disabled={currentIndex === 0}>
                Cliente Anterior
              </Button>
              <Button onClick={() => handleOpenModal("create")}>
                Criar Novo Cliente
              </Button>
              <Button onClick={() => handleOpenModal("edit")}>Editar Cliente</Button>
              <Button
                onClick={nextClient}
                disabled={currentIndex === clients.length - 1}
              >
                Próximo Cliente
              </Button>
            </Grid>
          </Paper>
        )}
        {error && (
          <div style={{ color: "red" }}>
            <p>{error}</p>
          </div>
        )}
        <MainContent
          title="Bem vindo à Loja ADM!"
          subtitle="Livre para fazer suas compras!"
          cardData={newCardData}
        />
        <Latest />
      </Container>
      <Footer />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            {isCreating ? "Criar Novo Cliente" : "Editar Cliente"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                value={isCreating ? newClient.nome : currentClient?.nome || ""}
                onChange={(e) => isCreating
                  ? setNewClient({ ...newClient, nome: e.target.value })
                  : setCurrentClient({ ...currentClient, nome: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contato"
                value={isCreating ? newClient.contato : currentClient?.contato || ""}
                onChange={(e) => isCreating
                  ? setNewClient({ ...newClient, contato: e.target.value })
                  : setCurrentClient({ ...currentClient, contato: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={isCreating ? newClient.email : currentClient?.email || ""}
                onChange={(e) => isCreating
                  ? setNewClient({ ...newClient, email: e.target.value })
                  : setCurrentClient({ ...currentClient, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CPF"
                value={isCreating ? newClient.CPF : currentClient?.CPF || ""}
                onChange={(e) => isCreating
                  ? setNewClient({ ...newClient, CPF: e.target.value })
                  : setCurrentClient({ ...currentClient, CPF: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            {isCreating ? (
              <Button
                onClick={handleCreateClient}
                variant="contained"
                color="success"
              >
                Criar Cliente
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleEditClient}
                  variant="contained"
                  color="primary"
                >
                  Salvar Alterações
                </Button>
                <Button
                  onClick={handleDeleteClient}
                  variant="contained"
                  color="error"
                >
                  Deletar Cliente
                </Button>
              </>
            )}
          </Grid>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}
