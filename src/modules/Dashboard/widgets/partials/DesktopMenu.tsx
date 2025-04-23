import { Logout as LogoutIcon } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useTranslations } from "next-intl";
import * as React from "react";

interface IDesktopMenuProps {
  anchorEl: null | HTMLElement;
  menuId: string;
  isOpen: boolean;
  onClose: VoidFunction;
  onLogout: VoidFunction;
}

const DesktopMenu: React.FC<IDesktopMenuProps> = ({
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
      <MenuItem onClick={onClose}>{t("profile_label")}</MenuItem>
      <MenuItem onClick={onLogout} sx={{ color: "red" }}>
        <LogoutIcon />
        {t("logout_label")}
      </MenuItem>
    </Menu>
  );
};

export default DesktopMenu;
