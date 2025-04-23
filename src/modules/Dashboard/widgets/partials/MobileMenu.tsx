import {
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { useTranslations } from "next-intl";
import * as React from "react";

interface IMobileMenuProps {
  anchorEl: null | HTMLElement;
  menuId: string;
  isOpen: boolean;
  onClose: VoidFunction;
  onLogout: VoidFunction;
}

const MobileMenu: React.FC<IMobileMenuProps> = ({
  anchorEl,
  menuId,
  isOpen,
  onClose,
  onLogout,
}) => {
  const t = useTranslations("Base.Widgets.Menu");

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpen}
      onClose={onClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>{t("notifications_label")}</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <p>{t("profile_label")}</p>
      </MenuItem>
      <MenuItem sx={{ color: "red" }} onClick={onLogout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>{t("logout_label")}</p>
      </MenuItem>
    </Menu>
  );
};

export default MobileMenu;
