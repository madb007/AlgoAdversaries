import { Request, Response } from 'express';
import { authService } from '../cognito';

export async function handleLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const result = await authService.signIn(email, password);
        
        res.json({
            success: true,
            user: {
                email: result.user.getUsername(),
                session: result.session
            }
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
