/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  verified: boolean;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAccountMutation
// ====================================================

export interface CreateAccountMutation_createAccount {
  __typename: "CreateAccountResult";
  ok: boolean;
  error: string | null;
}

export interface CreateAccountMutation {
  createAccount: CreateAccountMutation_createAccount;
}

export interface CreateAccountMutationVariables {
  input: CreateAccountInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  __typename: "LoginResult";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  input: LoginInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyEmail
// ====================================================

export interface VerifyEmail_verifyEmail {
  __typename: "VerifyEmailResult";
  error: string | null;
  ok: boolean;
}

export interface VerifyEmail {
  verifyEmail: VerifyEmail_verifyEmail;
}

export interface VerifyEmailVariables {
  code: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditProfile
// ====================================================

export interface EditProfile_editProfile {
  __typename: "EditProfileResult";
  error: string | null;
  ok: boolean;
}

export interface EditProfile {
  editProfile: EditProfile_editProfile;
}

export interface EditProfileVariables {
  input: EditProfileInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ForgotPassword
// ====================================================

export interface ForgotPassword_forgotPassword {
  __typename: "ForgotPasswordResult";
  error: string | null;
  ok: boolean;
}

export interface ForgotPassword {
  forgotPassword: ForgotPassword_forgotPassword;
}

export interface ForgotPasswordVariables {
  input: ForgotPasswordInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_resetPassword {
  __typename: "ResetPasswordResult";
  error: string | null;
  ok: boolean;
}

export interface ResetPassword {
  resetPassword: ResetPassword_resetPassword;
}

export interface ResetPasswordVariables {
  input: ResetPasswordInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Verified
// ====================================================

export interface Verified {
  __typename: "User";
  verified: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EditUser
// ====================================================

export interface EditUser {
  __typename: "User";
  email: string;
  verified: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  code: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
