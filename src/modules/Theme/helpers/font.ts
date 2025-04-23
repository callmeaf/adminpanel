import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

export const IRANYekanFont = localFont({
  variable: "--font-iranyekan",
  src: [
    {
      path: "../fonts/iranyekan/woff2/IRANYekanWebBold.woff2",
      style: "normal",
      weight: "bold",
    },
    {
      path: "../fonts/iranyekan/woff2/IRANYekanWebThin.woff2",
      style: "normal",
      weight: "100",
    },
    {
      path: "../fonts/iranyekan/woff2/IRANYekanWebLight.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "../fonts/iranyekan/woff2/IRANYekanWebRegular.woff2",
      style: "normal",
      weight: "normal",
    },
    {
      path: "../fonts/iranyekan/woff2/IRANYekanWebMedium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../fonts/iranyekan/woff2/IRANYekanWebExtraBlack.woff2",
      style: "normal",
      weight: "800",
    },
    {
      path: "../fonts/iranyekan/woff2/IRANYekanWebBlack.woff2",
      style: "normal",
      weight: "850",
    },
    {
      path: "../fonts/iranyekan/woff2/IRANYekanWebExtraBlack.woff2",
      style: "normal",
      weight: "900",
    },
  ],
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
