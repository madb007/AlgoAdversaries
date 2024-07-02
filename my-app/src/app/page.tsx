
import Head from "next/head";
import React from 'react';
import "./globals.css";
import Navbar from './components/AuthPage';
import TextGenerator from "./components/TextGenerator";
import {AuthProvider} from './context/AuthContext';

export default function Home() {
  return (
    <div className="bg-[#030422] min-h-screen flex justify-center items-center m-0 p-0 relative">
      <Navbar />
      <div className="absolute inset-0 flex justify-center items-center">
        <img src="AlgoAdversaries.png" alt="AlgoAdversaries" className="w-[400px] h-[400px] border-none m-0 p-0" />
      </div>
      {/* Text Across Screen animation for Login*/}
      {/* <div className="absolute top-[540px] right-1/2 transform translate-x-1/2">
        <TextGenerator text={"1 fn main(){ \n \n2      println!('Welcome! Sign in to start coding!'); \n \n3 }"} color='white' fontSize='2em' />
      </div> */}
    </div>
  );
}
