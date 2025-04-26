import "@/styles/globals.css";
import type { AppProps } from "next/app";
//import Navbar from "@/components/Navbar"; // Імпортуємо навбар
//import Footer from "@/components/Footer"; // Імпортуємо футер

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
     
    </>
  );
}
