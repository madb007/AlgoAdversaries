import { Request, Response } from 'express';
import { authService } from '../cognito';

export async function handleRegister(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const result = await authService.signUp(email, password) as any;
        
        res.json({
            success: true,
            message: 'Registration successful. Please check your email for verification.',
            userSub: result.userSub
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}