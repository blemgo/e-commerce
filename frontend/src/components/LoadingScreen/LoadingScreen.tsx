import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { loadingScreenStyles } from './LoadingScreenStyle';

const LoadingScreen = () => (
  <Box sx={loadingScreenStyles.root}>
    <CircularProgress />
  </Box>
);

export { LoadingScreen };
