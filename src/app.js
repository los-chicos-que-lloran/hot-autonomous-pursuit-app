import Amplify, { API, graphqlOperation } from "aws-amplify";

import awsconfig from "./aws-exports";
//import { createTodo } from "./graphql/mutations";
//import { onCreateTodo } from "./graphql/subscriptions";
import { Auth } from 'aws-amplify';

import { userAuthState } from './auth_user';
import { checkAuthContent } from './pursuit';
import { signUp, confirmSignUp, resendConfirmationCode } from './signup';
import { signIn } from './login';
//import { forgotPass, confirmForgotPass } from './auth_forgot_password';
//import { signOut } from './auth_logout';


//Amplify.configure(aws_exports);
checkAuthContent();

console.log("Amplify.configure....");

Amplify.configure(awsconfig);




console.log("App.js finished...");