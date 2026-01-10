import axios from 'axios';
import { DEFAULT_HEADERS, HEADER_KEYS } from '../utils/header';
import { Session } from './session';
import { BASEURL,  } from '../utils/env';

export const httpClient = axios.create({
  baseURL: BASEURL.BASE_URL,
  headers: DEFAULT_HEADERS,
  timeout: 20000,
});

httpClient.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};

  config.headers[HEADER_KEYS.LangID] = Session.getLangId();

  const uid = Session.getUserId();
  if (uid) config.headers[HEADER_KEYS.UserId] = uid;

  return config;
});
