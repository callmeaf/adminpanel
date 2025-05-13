"use client";

import { useRouter } from "@/i18n/routing";
import useRoutes from "@/modules/Base/hooks/use-routes";
import { Button, Container, Typography } from "@mui/material";

export default function HomePage() {
  const { getRouteByName } = useRoutes();
  const router = useRouter();

  const handleStart = () => {
    const route = getRouteByName("dashboard");

    if (route) {
      router.push(route.href);
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        gap: 4,
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center">
        به Trader Bot خوش اومدی
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleStart}
      >
        شروع
      </Button>
    </Container>
  );
}
