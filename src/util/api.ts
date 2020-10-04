import axios from 'axios';
import { groupBy } from '../util/groupBy';

import { articles, isLoading, totalResults } from './articlesStore';
import type { Category, Country, NewsByCategoryRes } from './types';

const baseUrlHeadlines = 'https://newsapi.org/v2/top-headlines';
const pageSize = '20';

const CACHE_NAME = 'svelte-news';
const CACHE_DURATION = 300000; // 5 minutes in ms

export async function getNewsByCategory(
  category: Category,
  country: Country,
  page = 1,
  searchTerm?: string
): Promise<void> {
  try {
    isLoading.set(true);

    let data: NewsByCategoryRes;

    const urlParams = new URLSearchParams({
      country,
      category,
      pageSize,
      page: String(page),
    });
    if (searchTerm) urlParams.append('searchTerm', searchTerm);

    const urlObj = new URL(baseUrlHeadlines);
    urlObj.search = urlParams.toString();

    const url = urlObj.toString();

    const options: RequestInit = {
      method: 'GET',
      headers: {
        'X-Api-Key': NEWSAPI_KEY,
      },
    };

    const cache = await caches.open(CACHE_NAME);

    const cachedRes = await caches.match(url);

    if (cachedRes) {
      const expiration = cachedRes.headers.get('app-cache-expiration');

      if (expiration && new Date(expiration) > new Date())
        data = await cachedRes.json();
      else console.log('cache expired!', url);
    }

    if (!data) {
      const res = await axios.get(url, { headers: options.headers });

      data = res && res.data;

      try {
        const expiration = new Date(Date.now() + CACHE_DURATION).toISOString();
        const response = new Response(JSON.stringify(res.data), {
          headers: { 'app-cache-expiration': expiration },
        });
        console.log(response, response.headers.get('app-cache-expiration'));

        await cache.put(url, response);
      } catch (error) {
        console.log(error);
      }
    }

    if (data) {
      const groupedArticles = groupBy(data.articles, (item) =>
        item.publishedAt.substr(0, 10)
      );

      const groups = {};
      for (let [key, value] of groupedArticles) groups[key] = value;

      articles.set(groups);
      totalResults.set(data.totalResults);
    }

    isLoading.set(false);
  } catch (error) {
    __DEV__ && console.log(error);
  }
}

const timer = (time = 1000) =>
  new Promise((res) => setTimeout(() => res(), time));
