import { environment } from '../../environments/environment';

const base = environment.API_URL;

export const tagsURL = `${base}/tags`;
export const articlesURL = `${base}/articles`;
export const articlesFeedURL = `${articlesURL}/feed`;
export const usersURL = `${base}/users`;
export const userLoginURL = `${usersURL}/login`;

/**
 * POST to follow an author
 * DELETE to unfollow an author
 *  */
export const followURL = (username: string) => `${base}/profiles/${encodeURIComponent(username)}/follow`
