import { Request, Response } from 'express';
import { authService } from '../cognito';

export const handleForgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        await authService.forgotPassword(email);
        res.json({success : true,
            message: 'Reset code sent to email',
        });
    }
    catch(error: any) {
        res.status(400).json({error: error.message});
    }
}

export const handleResetPassword = async(req: Request, res: Response) => {
    try {
        const { email, code, newpassword} = req.body;
        await authService.confirmPassword(email, code, newpassword);
        res.json({success : true,
            message: 'Password reset successful',
        });
    } catch(error: any) {
        res.status(400).json({error: error.message});
    }
}