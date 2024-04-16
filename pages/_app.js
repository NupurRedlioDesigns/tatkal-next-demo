import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';
import { SessionProvider, useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Login from './auth/SignIn';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  // const { data, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   console.log(status, data);
  //   if (status === 'unauthenticated') {
  //     router.push('/auth/SignIn')
  //   }
  // }, [data])
  console.log(Component.auth);
  return (
    <SessionProvider session={pageProps.session} baseUrl='/auth/SignIn' refetchOnWindowFocus={true}>
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
function Auth({ children }) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children;
}