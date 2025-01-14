import {CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
}

const userPool = new CognitoUserPool(poolData);

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
                }
            );
        });
    },
    
    async signIn(email: string, password: string) {
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
                onSuccess: (result) =>  {
                    resolve(result);
                },
                onFailure: (error) => {
                    reject(error);
                },
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
