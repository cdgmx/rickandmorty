import { Typography, Box } from '@mui/material';

const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      data-testid="loading-component"
    >
      <Typography variant="h6">Please Wait</Typography>
    </Box>
  );
};

export default LoadingComponent;
