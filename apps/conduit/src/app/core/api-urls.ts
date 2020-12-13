import { environment } from '../../environments/environment';

const base = environment.API_URL;

export const tagsURL = `${base}/tags`;
export const articlesURL = `${base}/articles`;
export const articlesFeedURL = `${articlesURL}/feed`;
export const usersURL = `${base}/users`;
export const userLoginURL = `${usersURL}/login`;
