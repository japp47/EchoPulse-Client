import "@/styles/globals.css";
import { Inter } from "next/font/google";
import {GoogleOAuthProvider} from '@react-oauth/google'
import type { AppProps } from "next/app";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import {Toaster} from 'react-hot-toast'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
  <div className= {inter.className}>
    
    <QueryClientProvider client={queryClient}>

    <GoogleOAuthProvider clientId="598110357908-a153hslakj8jm9ctihuemd3j7pnh8ek9.apps.googleusercontent.com">
    <Component {...pageProps} />
    <Toaster/>
    <ReactQueryDevtools/>
    </GoogleOAuthProvider>
    </QueryClientProvider>
  </div>
  );
}
