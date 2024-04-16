import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  );
}