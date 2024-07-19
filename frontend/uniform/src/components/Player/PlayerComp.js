 import React from 'react';
import { Box, ThemeProvider } from '@mui/material';

export default function PlayerContainer() {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#F8F8F8',
            team: '#EA0029',
          },
        },
      }}
      >
      <Box
        display="flex"
        alignItems="center"
        sx={{
          width: 400,
          height: 500,
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.team',
          },
        }}
      />
    </ThemeProvider>
    
  );
}