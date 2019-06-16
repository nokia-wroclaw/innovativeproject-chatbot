export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://murmuring-earth-40583.herokuapp.com'
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/oauth2/redirect' : 'https://innovativeproject-chatbot.herokuapp.com/oauth2/redirect'; 

export const GOOGLE_AUTH_URL = baseUrl + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = baseUrl + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = baseUrl + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;