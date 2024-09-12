import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppAppBar from '../components/AppAppBar';
import MainContent from '../components/MainContent';
import Latest from '../components/Latest';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import getBlogTheme from '../theme/getBlogTheme';
import { useNavigate } from 'react-router-dom';

export default function Blog() {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  
  React.useEffect(() => {
    
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); 
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
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
        apUm="Mais Vendidos"
        apDois="Sobre nós"
        apTres="Regiões Eletro LTDA"
        apQuatro="Promoções"
        apCinco="Trabalhe conosco"
        apSeis="Contatos"
        onEntrarClick={() => navigate('/loja')}
        entrar="Entrar"
        onCadastrarClick={() => navigate('/login')}
        cadastrar="Cadastrar"
        // Note that we don't include the 'editar' prop here
      />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', mt: 24, mb: 16, gap: 4 }}
      >
        <MainContent
         label1="Mais Vendidos"
         label2="Sobre nós"
         label3="Regiões Eletro LTDA"
         label4="Promoções"
         label5="Trabalhe conosco"
         label6="Contatos"
         />
        <Latest />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}











