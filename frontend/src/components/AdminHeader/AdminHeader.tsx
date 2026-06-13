import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { adminHeaderStyles } from "./AdminHeader.styles";

interface AdminHeaderProps {
  title: string;
  actions?: ReactNode;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, actions }: AdminHeaderProps) => {
  return (
    <Box sx={adminHeaderStyles.container}>
      <Typography variant="h4" sx={adminHeaderStyles.title}>
        {title}
      </Typography>

      {actions && <Box sx={adminHeaderStyles.actions}>{actions}</Box>}
    </Box>
  );
};

export { AdminHeader };
