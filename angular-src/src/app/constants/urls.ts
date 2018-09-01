// const BASE_URL: string = 'http://localhost:8080';

const BASE_URL: string = '';

const BASE_AMAZON_S3_BUCKET_URL = 'https://avivharuzi-crm.s3.eu-west-3.amazonaws.com';

export const BASE_COMPANY_URL: string = `${BASE_URL}/api/company`;
export const BASE_RECIPE_URL: string = `${BASE_URL}/api/recipe`;

export const GET_COMPANIES_WITHOUT_CURRENT = `${BASE_COMPANY_URL}/companies`;
export const SET_COMPANY_CUSTOMER: string = `${BASE_COMPANY_URL}/customer`;
export const GET_COMPANY_CUSTOMERS: string = `${BASE_COMPANY_URL}/customers`;
export const GET_COMPANY_CUSTOMER_DETAILS: string = `${BASE_COMPANY_URL}/details`;

export const SET_RECIPE_URL: string = `${BASE_RECIPE_URL}`;
export const GET_RECIPES_FOR_CUSTOMER: string = `${BASE_RECIPE_URL}/customer`;
export const GET_RECIPES_FOR_COMPANY: string = `${BASE_RECIPE_URL}`;

export const SET_COMPANY_URL: string = `${BASE_URL}/register`;

export const LOGIN_URL: string = `${BASE_URL}/login`;
export const CHECK_TOKEN_URL: string = `${BASE_URL}/check`;

export const GET_COUNTRIES_URL: string = `${BASE_URL}/api/countries`;

export const NO_AUTHORIZATION_URLS: string[] = [SET_COMPANY_URL, LOGIN_URL, GET_COUNTRIES_URL];

export const PATH_IMAGES: string = `${BASE_AMAZON_S3_BUCKET_URL}`;

export const LOADING_GIF_PATH: string = 'assets/images/tools/loading.gif';
