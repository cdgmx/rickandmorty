import { Typography, Box } from '@mui/material';

const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      <img
        src="/images/portal.gif"
        alt="My Animation"
        style={{ height: '400px' }}
      />
      <Typography variant="h6">Please Wait</Typography>
    </Box>
  );
};

export default LoadingComponent;
