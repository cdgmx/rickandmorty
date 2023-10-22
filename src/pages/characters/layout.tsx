import React from 'react';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import Link from 'next/link';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      sx={{
        backgroundColor: 'white',
      }}
    >
      <AppBar position="sticky">
        <Toolbar>
          <Link href="/" passHref>
            <Typography variant="h6" style={{ cursor: 'pointer' }}>
              Home
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        sx={{
          alignItems: 'center',
          textAlign: 'center',
          flexGrow: 1,
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout;
