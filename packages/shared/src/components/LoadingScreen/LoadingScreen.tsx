import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { loadingScreenStyles } from './LoadingScreen.styles';

const LoadingScreen: React.FC = () => (
  <Box sx={loadingScreenStyles.root}>
    <CircularProgress />
  </Box>
);

export { LoadingScreen };
