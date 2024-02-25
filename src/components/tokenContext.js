import { createContext } from 'react';
import { getValueWithTimestamp } from './authService';

const defaultValue = null;

// accessTokenValue and refreshTokenValue are created first to avoid errors in case the tokens don't exist yet in local storage and returns null
const accessTokenValue = getValueWithTimestamp("accessToken").value;
export const LocalAccessToken = createContext(accessTokenValue !== null ? accessTokenValue : defaultValue);

const refreshTokenValue = getValueWithTimestamp("refreshToken").value;
export const LocalRefreshToken = createContext(refreshTokenValue !== null ? refreshTokenValue : defaultValue);
