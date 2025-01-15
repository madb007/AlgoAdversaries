import {CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails, CognitoUserSession} from 'amazon-cognito-identity-js';
import crypto from 'crypto';

export interface SignInResult {
    user: CognitoUser,
    session: CognitoUserSession,
}
const poolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID!,
    ClientId: process.env.COGNITO_CLIENT_ID!,
}

const userPool = new CognitoUserPool(poolData);


function generateSecretHash(username: string) {
    const clientSecret = process.env.COGNITO_CLIENT_SECRET!;
    const clientId = process.env.COGNITO_CLIENT_ID!;
    
    const message = username + clientId;
    const hash = crypto.createHmac('sha256', clientSecret);
    hash.update(message);
    return hash.digest('base64');
}

export const authService = {
    async signUp(email: string, password: string) {
        return new Promise((resolve,reject) => {
            const attributeList = [
                new CognitoUserAttribute({
     
                    Name: 'email',
                    Value: email,
                })
            ];

            userPool.signUp(
                email,
                password,
                attributeList,
                [],
                (error,result) => {
                    if(error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                },
                {
                    SECRET_HASH: generateSecretHash(email),
                }
            );
        });
    },
    
    async signIn(email: string, password: string): Promise<SignInResult> {
        return new Promise((resolve,reject) => {
            const authenticationDetails = new AuthenticationDetails({
                Username: email,
                Password: password,
            });

            const cognitoUser = new CognitoUser({
                Username: email,
                Pool : userPool,
            });

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (session) =>  {
                    resolve({
                        user: cognitoUser,
                        session
                    });
                },
                onFailure: (error) => {
                    reject(error);
                },
            });

        });
    },

    async forgotPassword(email: string) {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: userPool,
            })

            cognitoUser.forgotPassword({
                onSuccess: () => resolve(undefined),
                onFailure: reject,
            })
        });

    },
    
    async confirmPassword(email: string, code: string, newPassword: string) {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: userPool,
            });

            cognitoUser.confirmPassword(code, newPassword, {
                onSuccess: () => resolve(undefined),
                onFailure: reject,
            });
        });
    },

    getCurrentUser() {
        return userPool.getCurrentUser();
    },

    async signOut() {
        const cognitoUser = this.getCurrentUser();
        if(cognitoUser){
            cognitoUser.signOut();
        }
    }
}
