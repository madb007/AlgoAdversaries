import React, { useState, useEffect } from 'react';
import {AuthProvider} from './context/AuthContext';
import './globals.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'AlgoAdversaries',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <html lang="en">
      <body><AuthProvider><ToastContainer/>{children}</AuthProvider></body>
    </html> 
    </>
  )
}
