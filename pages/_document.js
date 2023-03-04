import { Html, Head, Main, NextScript } from "next/document";
import { Provider } from "react-supabase";
import { supabase } from "@/utils/supabaseClient";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
