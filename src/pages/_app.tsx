import React, { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../themes/default';
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
      console.log('hello');
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
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </React.Fragment>
  );
}