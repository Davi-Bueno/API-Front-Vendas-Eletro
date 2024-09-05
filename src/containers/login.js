import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { userLogin } from "../axios";
import getBlogTheme from "../theme/getBlogTheme";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Davi & © "}
      <Link color="inherit" href="localhost:3000/">
        Eletrodomésticos LTDA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//"script"
export default function Login() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  
  React.useEffect(() => {
    //tema
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
    //resposta para parametro especifico no url
    const query = new URLSearchParams(location.search);
    const errorParam = query.get("error");
    if (errorParam === "unauthorized") {
      alert('Você não está autorizado para acessar esta pagina!');
    }
  }, [location.search]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  //função de enviar dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      user: username,
      password: password,
    };

    try {
      const response = await userLogin(data);
      console.log("Dados retornados pelo backend:", response);
      if (response.token) {
        // se exister token
        
        localStorage.setItem("authToken", response.token);
        navigate("/loja");
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  //"estilos"
  return (
    /*"tema padrao de login" 1=importa const pra criar o tema
  2-"main/section";4-formato de "pintura" do container
  5-tipo box principal e seus estilos

  */
    <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
      <NavBar
        toggleCustomTheme={toggleCustomTheme}
        showCustomTheme={showCustomTheme}
        mode={mode}
        toggleColorMode={toggleColorMode}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Usuário"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Senha"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="lembrarSenha" color="primary" />}
                  label="Lembrar senha."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "green" }}
        
            >
              Entrar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
