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
// GraphQL query operation: OneCategory
// ====================================================

export interface OneCategory_oneCategory_category_restaurants_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface OneCategory_oneCategory_category_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  category: OneCategory_oneCategory_category_restaurants_category | null;
  isPromoted: boolean;
}

export interface OneCategory_oneCategory_category {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
  restaurants: OneCategory_oneCategory_category_restaurants[];
}

export interface OneCategory_oneCategory {
  __typename: "CategoryResult";
  error: string | null;
  ok: boolean;
  totalPages: number;
  category: OneCategory_oneCategory_category | null;
}

export interface OneCategory {
  oneCategory: OneCategory_oneCategory;
}

export interface OneCategoryVariables {
  input: CategoryInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OneRestaurant
// ====================================================

export interface OneRestaurant_oneRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface OneRestaurant_oneRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  category: OneRestaurant_oneRestaurant_restaurant_category | null;
  isPromoted: boolean;
}

export interface OneRestaurant_oneRestaurant {
  __typename: "OneRestaurantResult";
  error: string | null;
  ok: boolean;
  restaurant: OneRestaurant_oneRestaurant_restaurant | null;
}

export interface OneRestaurant {
  oneRestaurant: OneRestaurant_oneRestaurant;
}

export interface OneRestaurantVariables {
  input: OneRestaurantInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllRestaurants
// ====================================================

export interface AllRestaurants_allRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface AllRestaurants_allRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  category: AllRestaurants_allRestaurants_restaurants_category | null;
  isPromoted: boolean;
}

export interface AllRestaurants_allRestaurants {
  __typename: "AllRestaurantsResult";
  error: string | null;
  ok: boolean;
  totalPages: number;
  restaurants: AllRestaurants_allRestaurants_restaurants[] | null;
}

export interface AllRestaurants_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  img: string | null;
  slug: string;
}

export interface AllRestaurants_allCategories {
  __typename: "AllCategoriesResult";
  error: string | null;
  ok: boolean;
  categories: AllRestaurants_allCategories_categories[] | null;
}

export interface AllRestaurants {
  allRestaurants: AllRestaurants_allRestaurants;
  allCategories: AllRestaurants_allCategories;
}

export interface AllRestaurantsVariables {
  input: AllRestaurantsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchRestaurants
// ====================================================

export interface SearchRestaurants_searchRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface SearchRestaurants_searchRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  category: SearchRestaurants_searchRestaurants_restaurants_category | null;
  isPromoted: boolean;
}

export interface SearchRestaurants_searchRestaurants {
  __typename: "SearchRestaurantsResult";
  error: string | null;
  ok: boolean;
  totalPages: number;
  restaurants: SearchRestaurants_searchRestaurants_restaurants[] | null;
}

export interface SearchRestaurants {
  searchRestaurants: SearchRestaurants_searchRestaurants;
}

export interface SearchRestaurantsVariables {
  input: SearchRestaurantsInput;
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
// GraphQL mutation operation: CreateRestaurant
// ====================================================

export interface CreateRestaurant_createRestaurant {
  __typename: "CreateRestaurantResult";
  error: string | null;
  ok: boolean;
  restaurantId: number | null;
  slug: string | null;
  coverImg: string | null;
}

export interface CreateRestaurant {
  createRestaurant: CreateRestaurant_createRestaurant;
}

export interface CreateRestaurantVariables {
  input: CreateRestaurantInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyRestaurants
// ====================================================

export interface MyRestaurants_myRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface MyRestaurants_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  category: MyRestaurants_myRestaurants_restaurants_category | null;
  isPromoted: boolean;
}

export interface MyRestaurants_myRestaurants {
  __typename: "MyRestaurantsResult";
  error: string | null;
  ok: boolean;
  restaurants: MyRestaurants_myRestaurants_restaurants[];
}

export interface MyRestaurants {
  myRestaurants: MyRestaurants_myRestaurants;
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
// GraphQL fragment: RestaurantParts
// ====================================================

export interface RestaurantParts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface RestaurantParts {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  category: RestaurantParts_category | null;
  isPromoted: boolean;
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

export interface AllRestaurantsInput {
  page?: number | null;
}

export interface CategoryInput {
  page?: number | null;
  slug: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateRestaurantInput {
  name: string;
  address: string;
  coverImg: string;
  categoryName: string;
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

export interface OneRestaurantInput {
  restaurantId: number;
}

export interface ResetPasswordInput {
  code: string;
  password: string;
}

export interface SearchRestaurantsInput {
  page?: number | null;
  query: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
