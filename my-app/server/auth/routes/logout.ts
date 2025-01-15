import { authService } from '../cognito';
import { Request, Response } from 'express';

export const handleLogout = async (req: Request, res: Response) => {
    try {
        await authService.signOut();
        res.json({success : true});
    } catch(error: any) {
        res.status(400).json({error: error.message});
    }
}