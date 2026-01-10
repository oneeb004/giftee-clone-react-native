export const HEADER_KEYS = {
  LangID: 'LangID',
  UserId: 'UserId',
  ContentType: 'Content-Type',
} as const;

export const DEFAULT_HEADERS = {
  [HEADER_KEYS.ContentType]: 'application/json',
};
