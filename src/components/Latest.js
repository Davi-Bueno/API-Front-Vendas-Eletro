import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const clientReviews = [
  {
    name: 'Maria Silva',
    product: 'Geladeira Frost Free',
    rating: 5,
    review: 'Excelente geladeira! Muito espaçosa e econômica. O sistema frost free realmente funciona, não preciso mais descongelar.',
    avatar: '/static/images/avatar/1.jpg',
    date: '15 de maio de 2023',
  },
  {
    name: 'João Santos',
    product: 'Fogão 6 bocas',
    rating: 4,
    review: 'Ótimo fogão, as bocas são potentes e o forno é bem espaçoso. Só achei o painel um pouco complicado de usar no início.',
    avatar: '/static/images/avatar/2.jpg',
    date: '10 de maio de 2023',
  },
  {
    name: 'Ana Oliveira',
    product: 'Máquina de Lavar 12kg',
    rating: 5,
    review: 'Essa máquina de lavar é incrível! Silenciosa, eficiente e com vários programas úteis. Minha roupa nunca ficou tão limpa.',
    avatar: '/static/images/avatar/3.jpg',
    date: '5 de maio de 2023',
  },
  {
    name: 'Carlos Ferreira',
    product: 'Ar Condicionado Split',
    rating: 4,
    review: 'O ar condicionado é muito bom, resfria rápido e é econômico. A instalação foi um pouco complicada, mas o suporte da loja foi excelente.',
    avatar: '/static/images/avatar/4.jpg',
    date: '1 de maio de 2023',
  },
  {
    name: 'Fernanda Lima',
    product: 'Microondas Digital',
    rating: 5,
    review: 'Adorei esse microondas! Tem várias funções pré-programadas que facilitam muito o dia a dia. O design é moderno e combina com minha cozinha.',
    avatar: '/static/images/avatar/5.jpg',
    date: '25 de abril de 2023',
  },
];

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Review({ review }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar alt={review.name} src={review.avatar} />
        <Box>
          <Typography variant="subtitle2">{review.name}</Typography>
          <Typography variant="caption" color="text.secondary">{review.product}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {[...Array(review.rating)].map((_, index) => (
          <StarIcon key={index} sx={{ color: 'gold', fontSize: 20 }} />
        ))}
      </Box>
      <StyledTypography variant="body2" color="text.secondary">
        {review.review}
      </StyledTypography>
      <Typography variant="caption" color="text.secondary">
        {review.date}
      </Typography>
    </Box>
  );
}

Review.propTypes = {
  review: PropTypes.shape({
    name: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Latest() {
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Opiniões dos Clientes
      </Typography>
      <Grid container spacing={4} columns={12} sx={{ my: 4 }}>
        {clientReviews.map((review, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <Review review={review} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}