import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CommonLayout from '@/User/CommonLayout';
import { DefaultSeo } from 'next-seo';
import defaultSEOConfig from "@/config/seoConfig"

const theme = createTheme();


function MyApp({ Component, pageProps }) {
  useEffect(() => { document.title = 'MyApp'; }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DefaultSeo {...defaultSEOConfig} />
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;




