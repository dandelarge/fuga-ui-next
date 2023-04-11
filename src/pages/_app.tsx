import React, { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout
}

export default function MyApp(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side') as HTMLElement;
    if (jssStyles) {
      (jssStyles.parentElement as HTMLElement).removeChild(jssStyles);
    }
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <React.Fragment>
      <Head>
        <title>Fuga App!</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </React.Fragment>
  );
}