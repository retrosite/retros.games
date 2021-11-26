import { useEffect, createContext } from "react";
import { useRouter } from "next/router";
import "../styles/global.scss";

export const PageContext = createContext({});

const App = ({ Component, pageProps }) => {
  if (typeof window !== "undefined") console.log({ pageProps });

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {};
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <PageContext.Provider value={pageProps}>
      <Component {...pageProps} />
    </PageContext.Provider>
  );
};

export default App;