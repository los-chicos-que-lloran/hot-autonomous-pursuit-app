import Amplify, { API, graphqlOperation } from "aws-amplify";

import awsconfig from "./aws-exports";
//import { createTodo } from "./graphql/mutations";
//import { onCreateTodo } from "./graphql/subscriptions";
import { Auth } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

import { userAuthState } from './auth_user';
import { checkAuthContent } from './pursuit';
import { signUp, confirmSignUp, resendConfirmationCode } from './signup';
import { signIn } from './login';
//import { forgotPass, confirmForgotPass } from './auth_forgot_password';
//import { signOut } from './auth_logout';

checkAuthContent();

console.log("Amplify.configure....");

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

console.log("App.js finished...");