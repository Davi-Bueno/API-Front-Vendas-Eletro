import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Sitemark from "./SitemarkIcon";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 1,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar({
  entrar = "Entrar",
  cadastrar = "Cadastrar",
  editar,
  onEntrarClick,
  onCadastrarClick,
  onEditarClick,
  apUm,
  apDois,
  apTres,
  apQuatro,
  apCinco,
  apSeis,
}) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const navigate = useNavigate();

  const handleEntrarClick = () => {
    if (onEntrarClick) {
      onEntrarClick();
    } else {
      navigate("/login");
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Sitemark />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {apUm && (
                <Button variant="text" color="info" size="small">
                  {apUm}
                </Button>
              )}
              {apDois && (
                <Button variant="text" color="info" size="small">
                  {apDois}
                </Button>
              )}
              {apTres && (
                <Button variant="text" color="info" size="small">
                  {apTres}
                </Button>
              )}
              {apQuatro && (
                <Button variant="text" color="info" size="small">
                  {apQuatro}
                </Button>
              )}
              {apCinco && (
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  sx={{ minWidth: 0 }}
                >
                  {apCinco}
                </Button>
              )}
              {apSeis && (
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  sx={{ minWidth: 0 }}
                >
                  {apSeis}
                </Button>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {editar && ( // Render "Editar" button only if prop is provided
              <Button
                color="primary"
                variant="text"
                size="small"
                onClick={onEditarClick}
              >
                {editar}
              </Button>
            )}
            <Button
              color="primary"
              variant="text"
              size="small"
              onClick={handleEntrarClick}
            >
              {entrar}
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={onCadastrarClick}
            >
              {cadastrar}
            </Button>
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Mais vendidos</MenuItem>
                <MenuItem>Sobre nós</MenuItem>
                <MenuItem>Regiões Eletro LTDA</MenuItem>
                <MenuItem>Promoções</MenuItem>
                <MenuItem>Trabalhe conosco</MenuItem>
                <MenuItem>Contatos</MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Cadastrar
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Entrar
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
