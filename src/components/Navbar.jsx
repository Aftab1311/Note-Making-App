import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Navbar(){

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                width:'100%',
                textAlign:'center',
                color:'white',
                textDecoration:'none',
                textTransform:'uppercase',
                letterSpacing:'5px'
            }}
          >
            Note Making Application
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};