import "@/styles/globals.css";
import { supabase } from "@/utils/supabaseClient";
import { Provider } from "react-supabase";
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
