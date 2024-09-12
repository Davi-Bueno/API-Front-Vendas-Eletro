import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Eletros from "../theme/fotos/Eletros.png"
import Diversos from "../theme/fotos/Diversos.png"
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function Author({ authors }) {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">{currentDate}</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function MainContent({
  title = "Eletrodomésticos",
  subtitle = "Lugar certo para fazer boas compras e CRUDS",
  label1="Todos os Clientes",
  label2="Todos os Eletrodomésticos",
  label3="Todos os Vendedores",
  label4="Todos os Carrinhos",
  label5="Todos os Carrinho_Eletro",
  showCards = true,
  cardData = [{
    img: Eletros,
    tag: "Grande Porte",
    title: "Eletrodomésticos de Grande Porte",
    description: "Descubra nossa linha premium de eletrodomésticos de grande porte. De geladeiras espaçosas a fogões profissionais, temos tudo para equipar sua cozinha com o que há de melhor em tecnologia e design. Nossas opções combinam eficiência energética, durabilidade e funcionalidades avançadas para atender às necessidades da sua família.",
    authors: [
      { name: "Ana Eletro", avatar: "/static/images/avatar/1.jpg" },
      { name: "Carlos Técnico", avatar: "/static/images/avatar/2.jpg" },
    ],
  },
  {
    img: Diversos,
    tag: "Pequeno Porte",
    title: "Eletrodomésticos Menores",
    description: "Explore nossa coleção de eletrodomésticos menores que fazem grande diferença no seu dia a dia. De cafeteiras inteligentes a processadores de alimentos versáteis, oferecemos uma variedade de aparelhos compactos que combinam praticidade e inovação. Perfeitos para otimizar espaço e adicionar conveniência à sua rotina doméstica.",
    authors: [
      { name: "Lúcia Inovação", avatar: "/static/images/avatar/6.jpg" },
      { name: "Pedro Design", avatar: "/static/images/avatar/3.jpg" },
    ],
  },],
  showClientTable = false,
  clientData = [],
  onLabelClick,
  onClientSelect,
  selectedClientId,
  onEditClick,
  onSearch,
  showEletrodomesticoTable = false,
  eletrodomesticoData = [],
  onEletrodomesticoSearch,
  onEletrodomesticoSelect,
  selectedEletrodomesticoId,
  onVendedorSearch,
  showVendedorTable = false,
  vendedorData = [],
  onVendedorSelect,
  selectedVendedorId,
  onCreateClientClick,
  onCreateVendedorClick,
  onCreateEletrodomesticoClick,
}) {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  

  const handleCheckboxChange = (event, clientId) => {
    onClientSelect(event.target.checked ? clientId : null);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleEletrodomesticoCheckboxChange = (event, eletro) => {
    onEletrodomesticoSelect(event.target.checked ? eletro : null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>
        <Typography>
          {subtitle}
        </Typography>
      </div>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <Chip onClick={() => onLabelClick("Todos os Clientes")} size="medium" label={label1} />
          <Chip onClick={() => onLabelClick("Todos os Eletrodomésticos")} size="medium" label={label2} />
          <Chip onClick={() => onLabelClick("Todos os Vendedores")} size="medium" label={label3}  />
          <Chip onClick={() => onLabelClick("Todos os Carrinhos")} size="medium" label={label4}  />
          <Chip onClick={() => onLabelClick("Todos os Carrinho_Eletro")} size="medium" label={label5}  />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
        </Box>
      </Box>
      {showClientTable && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Pesquisar por nome, contato, email ou CPF"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch} edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: '20px' }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onCreateClientClick}
            >
              Criar Clientes
            </Button>
          </Box>
          <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
            <Table sx={{ minWidth: 650 }} aria-label="client table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedClientId !== null && selectedClientId !== clientData.length}
                      checked={clientData.length > 0 && selectedClientId === clientData.length}
                      onChange={() => {}}
                      inputProps={{ 'aria-label': 'select all clients' }}
                    />
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 'bold', 
                      backgroundColor: '#1976d2', 
                      color: 'white',
                      fontSize: '1.1rem'
                    }}
                  >
                    Nome
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 'bold', 
                      backgroundColor: '#1976d2', 
                      color: 'white',
                      fontSize: '1.1rem'
                    }}
                  >
                    Contato
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 'bold', 
                      backgroundColor: '#1976d2', 
                      color: 'white',
                      fontSize: '1.1rem'
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 'bold', 
                      backgroundColor: '#1976d2', 
                      color: 'white',
                      fontSize: '1.1rem'
                    }}
                  >
                    CPF
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientData.map((client) => (
                  <TableRow
                    key={client.id}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: '#ffffff' },
                      '&:nth-of-type(even)': { backgroundColor: '#f0f0f0' },
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                      backgroundColor: client.id === selectedClientId ? '#e3f2fd' : 'inherit'
                    }}
                    onClick={() => onClientSelect(client)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedClientId === client.id}
                        onChange={(event) => handleCheckboxChange(event, client.id)}
                        inputProps={{ 'aria-labelledby': `client-${client.id}` }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" id={`client-${client.id}`}>
                      {client.nome}
                    </TableCell>
                    <TableCell>{client.contato}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.CPF}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      
      {showEletrodomesticoTable && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Pesquisar eletrodomésticos"
              onChange={(e) => onEletrodomesticoSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: '20px' }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => onCreateEletrodomesticoClick("create")}
            >
              Criar Eletrodoméstico
            </Button>
          </Box>
          <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
            <Table sx={{ minWidth: 650 }} aria-label="eletrodomestico table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedEletrodomesticoId !== null && selectedEletrodomesticoId !== eletrodomesticoData.length}
                      checked={eletrodomesticoData.length > 0 && selectedEletrodomesticoId === eletrodomesticoData.length}
                      onChange={() => {}}
                      inputProps={{ 'aria-label': 'select all eletrodomesticos' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white', fontSize: '1.1rem' }}>
                    Eletrodoméstico
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white', fontSize: '1.1rem' }}>
                    Valor
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white', fontSize: '1.1rem' }}>
                    ID do Vendedor
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eletrodomesticoData.map((eletro) => (
                  <TableRow
                    key={eletro.id}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: '#ffffff' },
                      '&:nth-of-type(even)': { backgroundColor: '#f0f0f0' },
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                      backgroundColor: eletro.id === selectedEletrodomesticoId ? '#e3f2fd' : 'inherit'
                    }}
                    onClick={() => onEletrodomesticoSelect(eletro)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedEletrodomesticoId === eletro.id}
                        onChange={(event) => handleEletrodomesticoCheckboxChange(event, eletro)}
                        inputProps={{ 'aria-labelledby': `eletrodomestico-${eletro.id}` }}
                      />
                    </TableCell>
                    <TableCell>{eletro.eletrodomestico}</TableCell>
                    <TableCell>{eletro.valor}</TableCell>
                    <TableCell>{eletro.vendedorId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}{showVendedorTable && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Pesquisar vendedores"
              onChange={(e) => onVendedorSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: '20px' }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onCreateVendedorClick}
            >
              Criar Vendedor
            </Button>
          </Box>
          <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
            <Table sx={{ minWidth: 650 }} aria-label="vendedor table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedVendedorId !== null && selectedVendedorId !== vendedorData.length}
                      checked={vendedorData.length > 0 && selectedVendedorId === vendedorData.length}
                      onChange={() => {}}
                      inputProps={{ 'aria-label': 'select all vendedores' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white', fontSize: '1.1rem' }}>
                    Nome
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white', fontSize: '1.1rem' }}>
                    ID
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendedorData.map((vendedor) => (
                  <TableRow
                    key={vendedor.id}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: '#ffffff' },
                      '&:nth-of-type(even)': { backgroundColor: '#f0f0f0' },
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                      backgroundColor: vendedor.id === selectedVendedorId ? '#e3f2fd' : 'inherit'
                    }}
                    onClick={() => onVendedorSelect(vendedor)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedVendedorId === vendedor.id}
                        onChange={(event) => onVendedorSelect(event.target.checked ? vendedor : null)}
                        inputProps={{ 'aria-labelledby': `vendedor-${vendedor.id}` }}
                      />
                    </TableCell>
                    <TableCell>{vendedor.nome}</TableCell>
                    <TableCell>{vendedor.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {showCards && (
        <Grid container spacing={2} columns={12}>
          {cardData.map((card, index) => (
            <Grid item xs={12} md={6} key={index}>
              <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? "Mui-focused" : ""}
              >
                <CardMedia
                  component="img"
                  alt={card.title}
                  image={card.img}
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                />
                <SyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    {card.tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {card.title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {card.description}
                  </StyledTypography>
                </SyledCardContent>
                <Author authors={card.authors} />
              </SyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

MainContent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  label1: PropTypes.string,
  label2: PropTypes.string,
  label3: PropTypes.string,
  label4: PropTypes.string,
  label5: PropTypes.string,
  showCards: PropTypes.bool,
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          avatar: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  showClientTable: PropTypes.bool,
  clientData: PropTypes.array,
  onLabelClick: PropTypes.func,
  onClientSelect: PropTypes.func,
  selectedClientId: PropTypes.string,
  onEditClick: PropTypes.func,
  onSearch: PropTypes.func,
  showEletrodomesticoTable: PropTypes.bool,
  eletrodomesticoData: PropTypes.array,
  onEletrodomesticoSearch: PropTypes.func,
  onEletrodomesticoSelect: PropTypes.func,
  selectedEletrodomesticoId: PropTypes.number,
  showVendedorTable: PropTypes.bool,
  vendedorData: PropTypes.array,
  onVendedorSearch: PropTypes.func,
  onVendedorSelect: PropTypes.func,
  selectedVendedorId: PropTypes.number,
  onCreateClientClick: PropTypes.func,
  onCreateVendedorClick: PropTypes.func,
  onCreateEletrodomesticoClick: PropTypes.func,
};
