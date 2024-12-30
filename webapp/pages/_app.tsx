import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noLayoutRoutes = ["/", "/login"];

  const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname);

  return isNoLayoutRoute ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
