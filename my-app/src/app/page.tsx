import Head from "next/head";
import React from 'react';
import "./globals.css";
import Navbar from '../components/AuthPage';
import TextGenerator from "../components/TextGenerator";
import {AuthProvider} from '../context/AuthContext';

export default function Home() {
  return (
    <div className="bg-[#030422] min-h-screen flex flex-col justify-center items-center m-0 p-0 relative">
      <Head>
        <title>AlgoAdversaries - Sharpen Your Coding Skills</title>
        <meta name="description" content="Practice coding challenges and improve your algorithm skills with AlgoAdversaries" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 ">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img src="AlgoAdversaries.png" alt="AlgoAdversaries" className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] border-none m-0 p-0" />
          </div>
          <div className="md:w-1/2 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to AlgoAdversaries
            </h1>
            <p className="text-xl md:text-2xl mb-2">
              Sharpen your coding skills and conquer algorithmic challenges!
            </p>
          </div>
        </div>
      </main>  
    </div>
  );
}