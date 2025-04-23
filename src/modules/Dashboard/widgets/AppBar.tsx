import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBarMUI from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MoreIcon from "@mui/icons-material/MoreVert";
import AppDrawer from "./AppDrawer";
import Show from "@/modules/Base/components/common/Show";
import { ThemeContext } from "@/modules/Theme/context/theme-context";
import { SET_THEME_MODE } from "@/modules/Theme/context/action-types";
import DesktopMenu from "./partials/DesktopMenu";
import MobileMenu from "./partials/MobileMenu";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import useHttp from "@/modules/Base/hooks/use-http";
import { logout } from "@/modules/Auth/requests/auth-requests";
import moduleConfig from "../module.config";
import authModuleConfig from "../../Auth/module.config";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function AppBar() {
  const { state, dispatch } = React.useContext(ThemeContext);
  const { mode: themeMode } = state;
  const toggleThemeMode = () =>
    dispatch({
      type: SET_THEME_MODE,
      payload: themeMode === "light" ? "dark" : "light",
    });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [appDrawerOpen, setAppDrawerOpen] = React.useState<boolean>(false);
  const handleOpenAppDrawer = () => setAppDrawerOpen(true);
  const handleCloseAppDrawer = () => setAppDrawerOpen(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const { handle: handleLogout } = useHttp(authModuleConfig, logout, {
    onSuccess: (_, { router, uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("logout.success_message"),
        },
      });
      router.replace(process.env.NEXT_PUBLIC_GUEST_REDIRECT_URL as string);
    },
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBarMUI position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleOpenAppDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={toggleThemeMode}
              >
                <Show when={themeMode === "light"}>
                  <Show.When>
                    <LightModeIcon />
                  </Show.When>
                  <Show.Else>
                    <DarkModeIcon />
                  </Show.Else>
                </Show>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBarMUI>
        <MobileMenu
          anchorEl={mobileMoreAnchorEl}
          isOpen={isMobileMenuOpen}
          menuId={mobileMenuId}
          onClose={handleMobileMenuClose}
          onLogout={handleLogout}
        />
        <DesktopMenu
          anchorEl={anchorEl}
          isOpen={isMenuOpen}
          menuId={menuId}
          onClose={handleMenuClose}
          onLogout={handleLogout}
        />
      </Box>
      <AppDrawer open={appDrawerOpen} onClose={handleCloseAppDrawer} />
    </>
  );
}
