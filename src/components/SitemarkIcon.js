import * as React from 'react';
import Box from '@mui/material/Box';
import logoEletro from "../theme/fotos/logo eletro.jpg";

export default function SitemarkIcon() {
  return (
    <Box
      component="img"
      sx={{
        height: 75,
        width: 'auto',
        maxWidth: 100,
        mr: 2
      }}
      alt="Logo Eletro"
      src={logoEletro}
    />
  );
}