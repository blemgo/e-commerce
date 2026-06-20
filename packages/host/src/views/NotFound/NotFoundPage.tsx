import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { notFoundStyles } from './NotFoundPage.styles';

const NotFoundPage: React.FC = () => (
  <Box sx={notFoundStyles.container}>
    <Typography variant="h2" sx={notFoundStyles.message}>
      you 404d
    </Typography>
  </Box>
);

export { NotFoundPage };
