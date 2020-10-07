export const baseUrlHeadlines = 'https://newsapi.org/v2/top-headlines';

export const pageSize = 20;

export const requestOptions: RequestInit = {
  method: 'GET',
  headers: {
    'X-Api-Key': NEWSAPI_KEY,
  },
};

export const CACHE_NAME = 'svelte-news';
export const CACHE_DURATION = 1800000; // 5 minutes in ms
