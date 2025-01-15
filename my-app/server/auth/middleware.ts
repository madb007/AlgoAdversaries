import { NextResponse, NextRequest } from 'next/server';
import {authService} from './cognito';

export async function authMiddleware(request: NextRequest) {
    try {
        const token = request.headers.get('authorization')?.split(' ')[1];
        
        if(!token) {
            return NextResponse.json({error: 'No token'}, {status: 401});
        }

        const cognitoUser = authService.getCurrentUser();
        if(!cognitoUser) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }

        const session = await new Promise((resolve,reject) => {
            cognitoUser.getSession((err: any, session: any) => {
                if (err) reject(err);
                else resolve(session);
            });
        
        });

        if(!session) {
            return NextResponse.json({error: 'Invalid session'}, {status: 401});

        }

        return NextResponse.next();
    } catch(err: any) {
        console.log("Auth middleware error", err);
        return NextResponse.json({error: 'Auth failed with an error'}, {status: 401});
    }
}