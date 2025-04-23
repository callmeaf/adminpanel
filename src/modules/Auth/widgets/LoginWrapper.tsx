import * as React from "react";
import LoginForm from "./LoginForm";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LoginBG from "../../../../public/auth/login_bg.webp";
import useHttp from "@/modules/Base/hooks/use-http";
import { loginWithVerifyOtp } from "@/modules/Auth/requests/auth-requests";
import { sendOtp } from "@/modules/Otp/requests/otp-requests";
import Show from "@/modules/Base/components/common/Show";
import VerifyOtpForm from "@/modules/Otp/widgets/VerifyOtpForm";
import Timer from "@/modules/Base/components/common/Timer";
import { useTranslations } from "next-intl";
import toOtp from "@/modules/Otp/models/Otp";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import moduleConfig from "../module.config";

const OTP_RESEND_TIME = 60; // seconds

interface ILoginWrapperProps {}

const LoginWrapper: React.FC<ILoginWrapperProps> = ({}) => {
  const t = useTranslations("Auth.Wrappers.Login");

  const [mode, setMode] = React.useState<"login" | "otp">("login");

  const {
    handle: handleSendOtp,
    loading: loadingSendOtp,
    response: responseSendOtp,
  } = useHttp(moduleConfig, sendOtp, {
    onSuccess: (_, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("sendOtp.success_message"),
        },
      });
      setMode("otp");
    },
  });

  const sendOtpHandler = () => {
    handleSendOtp({
      identifier: responseSendOtp?.data.identifier,
    });
  };

  const {
    handle: handleLoginWithVerifyOtp,
    loading: loadingLoginWithVerifyOtp,
  } = useHttp(moduleConfig, loginWithVerifyOtp, {
    onSuccess: (_, { router, uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("loginWithVerifyOtp.success_message"),
        },
      });
      router.push(process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL as string);
    },
  });

  return (
    <Container
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Grid2
        container
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Typography variant={"h5"} sx={{ mb: 4 }}>
                {t("title")}
              </Typography>
              <Show when={mode === "login"}>
                <Show.When>
                  <LoginForm
                    onSubmit={handleSendOtp}
                    loading={loadingSendOtp}
                  />
                </Show.When>
                <Show.Else>
                  <VerifyOtpForm
                    onSubmit={handleLoginWithVerifyOtp}
                    loading={loadingLoginWithVerifyOtp}
                    identifier={
                      responseSendOtp
                        ? toOtp(responseSendOtp.data).identifier
                        : ""
                    }
                  />
                  <Box mt={3}>
                    <Timer
                      initialSeconds={OTP_RESEND_TIME}
                      onReset={sendOtpHandler}
                      resetTooltip={t("resend_otp_btn_tooltip")}
                    />
                  </Box>
                </Show.Else>
              </Show>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={6}>
          <div>
            <Image src={LoginBG} alt="Login bg" />
          </div>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default LoginWrapper;
