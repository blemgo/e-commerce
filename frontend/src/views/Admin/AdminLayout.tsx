import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import { SidePanel } from "@components/SidePanel";
import type { SidePanelItem } from "@components/SidePanel";
import { IconedRedirect } from "@components/IconedRedirect";
import { adminLayoutStyles } from "./AdminLayout.styles";

const ADMIN_ITEMS: SidePanelItem[] = [
  {
    label: "Products",
    icon: <LocalOfferOutlinedIcon />,
    path: "/admin/products",
  },
  {
    label: "Orders",
    icon: <Inventory2OutlinedIcon />,
    path: "/admin/orders",
  },
];

const AdminLayout = () => {
  const footer = (
    <IconedRedirect
      icon={<PersonOutlineIcon />}
      to="/account"
      title="Back to my account"
    />
  );

  return (
    <Box sx={adminLayoutStyles.container}>
      <SidePanel items={ADMIN_ITEMS} footer={footer} />

      <Box component="section" sx={adminLayoutStyles.content}>
        <Outlet />
      </Box>
    </Box>
  );
};

export { AdminLayout };
