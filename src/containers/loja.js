import * as React from "react";
//material principal  de estrutura
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
//componentes
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppAppBar from "../components/AppAppBar";
import MainContent from "../components/MainContent";
import Latest from "../components/Latest";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import getBlogTheme from "../theme/getBlogTheme";
//navegação entre paginas
import { useNavigate } from "react-router-dom";
//funções de chamada via req
import {
  //clientes
  listarClientes,
  criarCliente,
  deletarCliente,
  updateCliente,
  //eletrodomesticos
  listarEletrodomesticos,
  criarEletrodomestico,
  deletarEletrodomestico,
  updateEletrodomestico,
  //vendedores
  listarVendedores,
  criarVendedor,
  deletarVendedor,
  updateVendedor,
} from "../axios";
//estilos das estruturas
import { TextField, Grid, Typography, Button, Modal, Box } from "@mui/material";
//estilos de avisos
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//tempo de logout (a complementar)
const LOJA_TIMEOUT = 30 * 60 * 1000; // 30 minutos em milissegundos

//função principal da página
export default function Loja() {
  const navigate = useNavigate();

  //tema
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  //atividade e navegação
  const [lastActivity, setLastActivity] = React.useState(Date.now());
  //selecionar cliente $ instância do cliente via modal
  const [clients, setClients] = React.useState([]);
  const [filteredClients, setFilteredClients] = React.useState([]);
  const [currentClient, setCurrentClient] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [error, setError] = React.useState(null);
  //tabela de clientes
  const [showClientTable, setShowClientTable] = React.useState(false);

  //modal editor para editor de clientes
  const [openModal, setOpenModal] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  // modals especificos
  const [openClientModal, setOpenClientModal] = React.useState(false);
  const [openEletrodomesticoModal, setOpenEletrodomesticoModal] =
    React.useState(false);
  //criar
  const [newClient, setNewClient] = React.useState({
    nome: "",
    contato: "",
    email: "",
    CPF: "",
  });
  //estados para eletrodomesticos
  // Novos estados para eletrodomésticos
  const [eletrodomesticos, setEletrodomesticos] = React.useState([]);
  const [filteredEletrodomesticos, setFilteredEletrodomesticos] =
    React.useState([]);
  const [showEletrodomesticoTable, setShowEletrodomesticoTable] =
    React.useState(false);
  const [currentEletrodomestico, setCurrentEletrodomestico] =
    React.useState(null);

  const [selectedEletrodomesticoId, setSelectedEletrodomesticoId] =
    React.useState(null);
  const [newEletrodomestico, setNewEletrodomestico] = React.useState({
    eletrodomestico: "",
    valor: "",
    vendedorId: "",
  });

  //estado de criação
  const [isCreating, setIsCreating] = React.useState(false);
  //aviso de sucess
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [selectedClientId, setSelectedClientId] = React.useState(null);
  //vendedores
  // Novos estados para vendedores
  const [vendedores, setVendedores] = React.useState([]);
  const [isCreatingVendedor, setIsCreatingVendedor] = React.useState(false);

  const [filteredVendedores, setFilteredVendedores] = React.useState([]);
  const [showVendedorTable, setShowVendedorTable] = React.useState(false);
  const [currentVendedor, setCurrentVendedor] = React.useState(null);
  const [selectedVendedorId, setSelectedVendedorId] = React.useState(null);
  const [newVendedor, setNewVendedor] = React.useState({
    nome: "",
  });
  const [openVendedorModal, setOpenVendedorModal] = React.useState(false);

  const handleEletrodomesticoSelect = (eletrodomestico) => {
    setSelectedEletrodomesticoId(eletrodomestico ? eletrodomestico.id : null);
  };

  //função pra abrir o modal + editar+mostrar cliente/eletro atual
  const handleOpenClientModal = (mode) => {
    setEditMode(mode === "edit");
    setIsCreating(mode === "create");
    if (mode === "create") {
      setNewClient({ nome: "", contato: "", email: "", CPF: "" });
    }
    setOpenClientModal(true);
  };
  const handleCloseClientModal = () => {
    setOpenClientModal(false);
    setEditMode(false);
    setIsCreating(false);
  };
  const handleOpenEletrodomesticoModal = (mode) => {
    setEditMode(mode === "edit");
    setIsCreating(mode === "create");
    if (mode === "create") {
      setNewEletrodomestico({ eletrodomestico: "", valor: "", vendedorId: "" });
    }
    setOpenEletrodomesticoModal(true);
  };
  const handleCloseEletrodomesticoModal = () => {
    setOpenEletrodomesticoModal(false);
    setEditMode(false);
    setIsCreating(false);
  };
  //função para editar cliente
  const handleEditClient = async () => {
    if (!currentClient || !currentClient.id) {
      setSnackbarMessage("Nenhum cliente selecionado para editar.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await updateCliente(currentClient.id, currentClient);
      console.log("Resposta da atualização:", response);

      // Atualizar a lista de clientes
      const updatedClientsList = await listarClientes();
      setClients(updatedClientsList);

      // Atualizar o cliente atual
      const updatedCurrentClient = updatedClientsList.find(
        (client) => client.id === currentClient.ID_Cliente
      );
      if (updatedCurrentClient) {
        setCurrentClient(updatedCurrentClient);
      }

      // Mostrar mensagem de sucesso
      setSnackbarMessage("Cliente atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
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
      const updatedClients = await listarClientes();
      setClients(updatedClients);

      // Selecionar o novo cliente criado
      if (updatedClients.length > 0) {
        const newClientIndex = updatedClients.findIndex(
          (client) =>
            client.nome === newClient.nome && client.CPF === newClient.CPF
        );
        if (newClientIndex !== -1) {
          setCurrentClient(updatedClients[newClientIndex]);
          setCurrentIndex(newClientIndex);
        }
      }

      // Fechar o modal e resetar o estado

      setNewClient({ nome: "", contato: "", email: "", CPF: "" });
      setSnackbarMessage("Cliente criado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao criar novo cliente:", error);
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
    if (!currentClient || !currentClient.id) {
      console.log("ID do cliente não encontrado:", currentClient);
      setSnackbarMessage("ID do cliente não encontrado.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    const isConfirmed = window.confirm(
      `Tem certeza que deseja deletar o cliente ${currentClient.nome}?`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await deletarCliente(currentClient.id);

      // Atualizar lista de clientes
      const updatedClients = await listarClientes();
      setClients(updatedClients);

      // Atualizar cliente atual
      if (updatedClients.length > 0) {
        const newIndex = Math.min(currentIndex, updatedClients.length - 1);
        setCurrentIndex(newIndex);
        setCurrentClient(updatedClients[newIndex]);
      } else {
        setCurrentClient(null);
        setCurrentIndex(-1);
      }

      // Fechar o modal

      // Aviso de delete com sucesso
      setSnackbarMessage("Cliente deletado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      setSnackbarMessage("Erro ao deletar cliente. Tente novamente.");
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
      console.log(
        "Resposta de listarClientes:",
        JSON.stringify(response, null, 2)
      );
      setClients(response);
      setFilteredClients(response); // Initialize filteredClients with all clients
      setShowClientTable(true);
      if (response.length > 0) {
        setCurrentClient(response[0]);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      setError("Erro ao carregar clientes. Por favor, tente novamente.");
    }
  };

  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();

    // Navigate to the login page
    navigate("/login");
  };
  //funs para vendedores
  const listarVendedor = async () => {
    try {
      const response = await listarVendedores();
      console.log(
        "Resposta de listarVendedores:",
        JSON.stringify(response, null, 2)
      );
      setVendedores(response);
      setFilteredVendedores(response);
      setShowVendedorTable(true);
    } catch (error) {
      console.error("Erro ao listar vendedores:", error);
      setError("Erro ao carregar vendedores. Por favor, tente novamente.");
    }
  };

  // Função para criar vendedor
  const handleCreateVendedor = async () => {
    try {
      const response = await criarVendedor(newVendedor);
      console.log("Novo vendedor criado:", response);
      await listarVendedor();
      setNewVendedor({ nome: "" });
      setSnackbarMessage("Vendedor criado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      handleCloseVendedorModal();
    } catch (error) {
      console.error("Erro ao criar novo vendedor:", error);
      setSnackbarMessage("Erro ao criar novo vendedor. Tente novamente.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Função para atualizar vendedor
  const handleEditVendedor = async () => {
    if (!currentVendedor || !currentVendedor.id) {
      setSnackbarMessage("Nenhum vendedor selecionado para editar.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await updateVendedor(
        currentVendedor.id,
        currentVendedor
      );
      console.log("Resposta da atualização:", response);
      await listarVendedor();
      handleCloseVendedorModal();
      setSnackbarMessage("Vendedor atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao atualizar vendedor:", error);
      setSnackbarMessage("Erro ao atualizar vendedor. Tente novamente.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Função para deletar vendedor
  const handleDeleteVendedor = async () => {
    if (!currentVendedor || !currentVendedor.id) {
      setSnackbarMessage("Nenhum vendedor selecionado para deletar.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const isConfirmed = window.confirm(
      `Tem certeza que deseja deletar o vendedor ${currentVendedor.nome}?`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await deletarVendedor(currentVendedor.id);
      await listarVendedor();
      handleCloseVendedorModal();
      setSelectedVendedorId(null);
      setCurrentVendedor(null);
      setSnackbarMessage("Vendedor deletado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao deletar vendedor:", error);
      setSnackbarMessage("Erro ao deletar vendedor. Tente novamente.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Função para buscar vendedores
  const handleSearchVendedor = (searchTerm) => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = vendedores.filter((vendedor) => {
      return (
        (vendedor.nome && vendedor.nome.toLowerCase().includes(lowercasedFilter)) ||
        (vendedor.id && vendedor.id.toString().includes(lowercasedFilter))
      );
    });
    setFilteredVendedores(filtered);
  };

  // Função para listar eletrodomésticos
  const listarEletrodomestico = async () => {
    try {
      const response = await listarEletrodomesticos();
      console.log(
        "Resposta de listarEletrodomesticos:",
        JSON.stringify(response, null, 2)
      );
      setEletrodomesticos(response);
      setFilteredEletrodomesticos(response);
      setShowEletrodomesticoTable(true);
    } catch (error) {
      console.error("Erro ao listar eletrodomésticos:", error);
      setError(
        "Erro ao carregar eletrodomésticos. Por favor, tente novamente."
      );
    }
  };

  // Função para criar eletrodoméstico
  const handleCreateEletrodomestico = async () => {
    if (!newEletrodomestico.eletrodomestico || !newEletrodomestico.valor || !newEletrodomestico.vendedorId) {
      setSnackbarMessage("Por favor, preencha todos os campos.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }
    try {
      const eletrodomesticoData={
        eletrodomestico: newEletrodomestico.eletrodomestico,
        valor: parseFloat(newEletrodomestico.valor),
        ID_Vendedor: parseInt(newEletrodomestico.vendedorId),
      };
      const response = await criarEletrodomestico(eletrodomesticoData);
      console.log("Novo eletrodoméstico criado:", response);
      await listarEletrodomestico();
      handleCloseEletrodomesticoModal();
      setNewEletrodomestico({ nome: "", marca: "", modelo: "", preco: "" });
      setSnackbarMessage("Eletrodoméstico criado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao criar novo eletrodoméstico:", error);
      setSnackbarMessage(
        "Erro ao criar novo eletrodoméstico. Tente novamente."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Função para atualizar eletrodoméstico
  const handleEditEletrodomestico = async () => {
    if (!currentEletrodomestico || !currentEletrodomestico.id) {
      setSnackbarMessage("Nenhum eletrodoméstico selecionado para editar.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const eletroToUpdate = {
      eletrodomestico: currentEletrodomestico.eletrodomestico,
      valor: currentEletrodomestico.valor,
      ID_Vendedor: currentEletrodomestico.vendedorId, // Certifique-se de que este campo existe
    };
    console.log("Dados a serem enviados para atualização:", eletroToUpdate);

    try {
      const response = await updateEletrodomestico(
        currentEletrodomestico.id,
        eletroToUpdate
      );
      console.log("Resposta da atualização:", response);
      await listarEletrodomestico();
      handleCloseEletrodomesticoModal();
      setSnackbarMessage("Eletrodoméstico atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Resto do código...
    } catch (error) {
      console.error("Erro ao atualizar eletrodoméstico:", error);
      setSnackbarMessage("Erro ao atualizar eletrodoméstico. Tente novamente.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  // Função para deletar eletrodoméstico
  const handleDeleteEletrodomestico = async () => {
    if (!currentEletrodomestico || !currentEletrodomestico.id) {
      setSnackbarMessage("Nenhum eletrodoméstico selecionado para deletar.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const isConfirmed = window.confirm(
      `Tem certeza que deseja deletar o eletrodoméstico ${currentEletrodomestico.eletrodomestico}?`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await deletarEletrodomestico(currentEletrodomestico.id);

      // Atualizar lista de eletrodomésticos
      await listarEletrodomestico();

      // Fechar o modal
      handleCloseEletrodomesticoModal();

      // Limpar o eletrodoméstico selecionado
      setSelectedEletrodomesticoId(null);
      setCurrentEletrodomestico(null);

      // Aviso de delete com sucesso
      setSnackbarMessage("Eletrodoméstico deletado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao deletar eletrodoméstico:", error);
      setSnackbarMessage("Erro ao deletar eletrodoméstico. Tente novamente.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  // Função para buscar eletrodomésticos
  const handleSearchEletrodomestico = (searchTerm) => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = eletrodomesticos.filter((eletro) => {
      return (
        (eletro.eletrodomestico && eletro.eletrodomestico.toLowerCase().includes(lowercasedFilter)) ||
        (eletro.valor && eletro.valor.toString().includes(lowercasedFilter)) ||
        (eletro.id && eletro.id.toString().includes(lowercasedFilter)) ||
        (eletro.vendedorId && eletro.vendedorId.toString().includes(lowercasedFilter))
      );
    });
    setFilteredEletrodomesticos(filtered);
  };

  //tabelas
  const handleLabelClick = async (label) => {
    if (label === "Todos os Clientes") {
      await listarCliente(); // Chama a função listarCliente diretamente
    } else if (label === "Todos os Eletrodomésticos") {
      await listarEletrodomestico();
    } else if (label === "Todos os Vendedores") {
      await listarVendedor();
    } else {
      setShowClientTable(false);
      setShowEletrodomesticoTable(false);
      setShowVendedorTable(false);
    }
  };

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId);
  };

  const handleEditClick = () => {
    if (showClientTable && selectedClientId) {
      const clientToEdit = clients.find(
        (client) => client.id === selectedClientId
      );
      if (clientToEdit) {
        setCurrentClient(clientToEdit);
        handleOpenClientModal("edit");
      }
    } else if (showEletrodomesticoTable && selectedEletrodomesticoId) {
      const eletroToEdit = eletrodomesticos.find(
        (eletro) => eletro.id === selectedEletrodomesticoId
      );
      if (eletroToEdit) {
        setCurrentEletrodomestico(eletroToEdit);
        handleOpenEletrodomesticoModal("edit");
      }
    } else if (showVendedorTable && selectedVendedorId) {
      const vendedorToEdit = vendedores.find(
        (vendedor) => vendedor.id === selectedVendedorId
      );
      if (vendedorToEdit) {
        setCurrentVendedor(vendedorToEdit);
        handleOpenVendedorModal("edit");
      }
    } else {
      setSnackbarMessage("Por favor, selecione um item para editar.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
    }
  };
  // Funções para abrir e fechar o modal de vendedor
  const handleOpenVendedorModal = (mode) => {
    setEditMode(mode === "edit");
    setIsCreating(mode === "create");
    if (mode === "create") {
      setNewVendedor({ nome: "" });
    }
    setOpenVendedorModal(true);
  };

  const handleCloseVendedorModal = () => {
    setOpenVendedorModal(false);
    setEditMode(false);
    setIsCreating(false);
  };

  const handleSearch = (searchTerm) => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = clients.filter(
      (client) =>
        client.nome.toLowerCase().includes(lowercasedFilter) ||
        client.contato.toLowerCase().includes(lowercasedFilter) ||
        client.email.toLowerCase().includes(lowercasedFilter) ||
        client.CPF.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredClients(filtered);
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
        onEditarClick={handleEditClick}
        editar="Editar"
        mode={mode}
        toggleColorMode={toggleColorMode}
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
        {error && (
          <div style={{ color: "red" }}>
            <p>{error}</p>
          </div>
        )}
        <MainContent
          title="Editor of Cruds by Davi.Adm!"
          subtitle="Abaixo segue em formato de tabelas!"
          // cardData={newCardData}
          label1="Todos os Clientes"
          label2="Todos os Eletrodomésticos"
          label3="Todos os Vendedores"
          label4="Todos os Carrinhos"
          label5="Todos os Carrinho_Eletro"
          showCards={false}
          onCreateClientClick={() => handleOpenClientModal("create")}
          onCreateVendedorClick={() => handleOpenVendedorModal("create")}
        onCreateEletrodomesticoClick={() => handleOpenEletrodomesticoModal("create")}

          showClientTable={showClientTable}
          clientData={filteredClients}
          onLabelClick={handleLabelClick}
          onClientSelect={handleClientSelect}
          selectedClientId={selectedClientId}
          showEletrodomesticoTable={showEletrodomesticoTable}
          eletrodomesticoData={filteredEletrodomesticos}
          onEletrodomesticoSearch={handleSearchEletrodomestico}
          onEletrodomesticoSelect={handleEletrodomesticoSelect}
          selectedEletrodomesticoId={selectedEletrodomesticoId}
          showVendedorTable={showVendedorTable}
          vendedorData={filteredVendedores}
          onVendedorSearch={handleSearchVendedor}
          onVendedorSelect={(vendedor) =>
            setSelectedVendedorId(vendedor ? vendedor.id : null)
          }
          selectedVendedorId={selectedVendedorId}
          onEditClick={handleEditClick}
          onSearch={handleSearch}
        />
        <Latest />
      </Container>
      <Footer />

      <Modal
        open={openClientModal}
        onClose={handleCloseClientModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            {isCreating ? "Criar Novo Cliente" : "Editar Cliente"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                value={isCreating ? newClient.nome : currentClient?.nome || ""}
                onChange={(e) =>
                  isCreating
                    ? setNewClient({ ...newClient, nome: e.target.value })
                    : setCurrentClient({
                        ...currentClient,
                        nome: e.target.value,
                      })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contato"
                value={
                  isCreating ? newClient.contato : currentClient?.contato || ""
                }
                onChange={(e) =>
                  isCreating
                    ? setNewClient({ ...newClient, contato: e.target.value })
                    : setCurrentClient({
                        ...currentClient,
                        contato: e.target.value,
                      })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={
                  isCreating ? newClient.email : currentClient?.email || ""
                }
                onChange={(e) =>
                  isCreating
                    ? setNewClient({ ...newClient, email: e.target.value })
                    : setCurrentClient({
                        ...currentClient,
                        email: e.target.value,
                      })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CPF"
                value={isCreating ? newClient.CPF : currentClient?.CPF || ""}
                onChange={(e) =>
                  isCreating
                    ? setNewClient({ ...newClient, CPF: e.target.value })
                    : setCurrentClient({
                        ...currentClient,
                        CPF: e.target.value,
                      })
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
      <Modal
        open={openEletrodomesticoModal}
        onClose={handleCloseEletrodomesticoModal}
        aria-labelledby="eletrodomestico-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="eletrodomestico-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            {isCreating
              ? "Criar Novo Eletrodoméstico"
              : "Editar Eletrodoméstico"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Eletrodoméstico"
                value={
                  isCreating
                    ? newEletrodomestico.eletrodomestico
                    : currentEletrodomestico?.eletrodomestico || ""
                }
                onChange={(e) =>
                  isCreating
                    ? setNewEletrodomestico({
                        ...newEletrodomestico,
                        eletrodomestico: e.target.value,
                      })
                    : setCurrentEletrodomestico({
                        ...currentEletrodomestico,
                        eletrodomestico: e.target.value,
                      })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Valor"
                type="number"
                value={
                  isCreating
                    ? newEletrodomestico.valor
                    : currentEletrodomestico?.valor || ""
                }
                onChange={(e) =>
                  isCreating
                    ? setNewEletrodomestico({
                        ...newEletrodomestico,
                        valor: e.target.value,
                      })
                    : setCurrentEletrodomestico({
                        ...currentEletrodomestico,
                        valor: e.target.value,
                      })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ID do Vendedor"
                type="number"
                value={
                  isCreating
                    ? newEletrodomestico.vendedorId
                    : currentEletrodomestico?.vendedorId || ""
                }
                onChange={(e) =>
                  isCreating
                    ? setNewEletrodomestico({
                        ...newEletrodomestico,
                        vendedorId: e.target.value,
                      })
                    : setCurrentEletrodomestico({
                        ...currentEletrodomestico,
                        vendedorId: e.target.value,
                      })
                }
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            {isCreating ? (
              <Button
                onClick={handleCreateEletrodomestico}
                variant="contained"
                color="success"
              >
                Criar Eletrodoméstico
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleEditEletrodomestico}
                  variant="contained"
                  color="primary"
                >
                  Salvar Alterações
                </Button>
                <Button
                  onClick={handleDeleteEletrodomestico}
                  variant="contained"
                  color="error"
                >
                  Deletar Eletrodoméstico
                </Button>
              </>
            )}
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openVendedorModal}
        onClose={handleCloseVendedorModal}
        aria-labelledby="vendedor-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="vendedor-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            {isCreating ? "Criar Novo Vendedor" : "Editar Vendedor"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                value={
                  isCreating ? newVendedor.nome : currentVendedor?.nome || ""
                }
                onChange={(e) =>
                  isCreating
                    ? setNewVendedor({ ...newVendedor, nome: e.target.value })
                    : setCurrentVendedor({
                        ...currentVendedor,
                        nome: e.target.value,
                      })
                }
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            {isCreating ? (
              <Button
                onClick={handleCreateVendedor}
                variant="contained"
                color="success"
              >
                Criar Vendedor
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleEditVendedor}
                  variant="contained"
                  color="primary"
                >
                  Salvar Alterações
                </Button>
                <Button
                  onClick={handleDeleteVendedor}
                  variant="contained"
                  color="error"
                >
                  Deletar Vendedor
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
