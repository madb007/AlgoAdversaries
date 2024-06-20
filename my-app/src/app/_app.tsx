import "./globals.css";
import type {AppProps} from "next/app";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({Component,pageProps}: AppProps){
    return(
        <>
            <Head>
                <title>BaljeetCode</title>
                <meta name='viewport' content='width = device-width,initial-scale=1'/>
                <link rel='icon' href = '/favicon.ico'/>
                <meta name='description' content = 'Competitive Leetcode Project for me and my friends'/>
            </Head>
            <Component {...pageProps}/>
        </>
    ); 
}