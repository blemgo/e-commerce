import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { iconedRedirectStyles } from './IconedRedirect.styles';

interface IconedRedirectProps {
  icon: ReactNode;
  title: string;
  to: string;
}

const IconedRedirect = ({ icon, title, to }: IconedRedirectProps) => {
  const navigate = useNavigate();

  return (
    <Box sx={iconedRedirectStyles.container} onClick={() => navigate(to)}>
      <Box sx={iconedRedirectStyles.iconBox}>{icon}</Box>
      <Typography sx={iconedRedirectStyles.title}>{title}</Typography>
      <ChevronRightIcon sx={iconedRedirectStyles.chevron} />
    </Box>
  );
};

export { IconedRedirect };
