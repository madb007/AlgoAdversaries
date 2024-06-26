import "./globals.css";
import type {AppProps} from "next/app";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from './context/AuthContext';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({Component,pageProps}: AppProps){
    return(
        <AuthProvider>
            <Head>
                <title>BaljeetCode</title>
                <meta name='viewport' content='width = device-width,initial-scale=1'/>
                <link rel='icon' href = '/favicon.ico'/>
                <meta name='description' content = 'Competitive Leetcode Project for me and my friends'/>
            </Head>
            <Component {...pageProps}/>
            <ToastContainer/>
        </AuthProvider>
    ); 
}