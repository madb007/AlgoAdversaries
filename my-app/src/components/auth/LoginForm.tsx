'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify'; 

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await login(email, password);
            toast.success('Login successful');
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    
    return (
        
    )