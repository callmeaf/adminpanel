import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useRoutes from "@/modules/Base/hooks/use-routes";
import { useRouter } from "@/i18n/routing";

interface IAppDrawer {
  open: boolean;
  onClose: VoidFunction;
}

export default function AppDrawer({ open, onClose }: IAppDrawer) {
  const router = useRouter();
  const handleNavigate = (href: string) => router.push(href);

  const { routes } = useRoutes();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
      {Object.entries(routes)
        .filter(
          ([_, items]) =>
            items.filter((item) => item.showInNavbar !== false).length
        )
        .map(([group, items]) => (
          <React.Fragment key={group}>
            <List>
              {items
                .filter((item) => item.showInNavbar !== false)
                .map((item) => (
                  <ListItem key={`${group}_${item.href}`} disablePadding>
                    <ListItemButton
                      onClick={handleNavigate.bind(null, item.href)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
            <Divider />
          </React.Fragment>
        ))}
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={onClose}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
