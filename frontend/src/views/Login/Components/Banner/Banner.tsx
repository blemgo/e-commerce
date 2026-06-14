import Box from '@mui/material/Box';
import ballyLogo from '../../../../assets/bally-white.png';
import registerImage from '../../../../assets/register.png';
import { bannerStyles } from './Banner.styles';

const Banner: React.FC = () => {
  return (
    <Box sx={bannerStyles.root}>
      <Box sx={bannerStyles.header}>
        <Box component="img" src={ballyLogo} alt="bally" sx={bannerStyles.logo} />
      </Box>

      <Box sx={bannerStyles.body}>
        <Box sx={bannerStyles.registerBox}>
          <Box
            component="img"
            src={registerImage}
            alt="Cash register"
            sx={bannerStyles.register}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { Banner };
