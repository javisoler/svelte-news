import axios from 'axios';
import { groupBy } from '../util/groupBy';

import { articles, isLoading, error, totalResults } from '../stores/articlesStore';
import type {
  Category,
  Country,
  GroupedArticles,
  NewsByCategoryRes,
} from './types';

const baseUrlHeadlines = 'https://newsapi.org/v2/top-headlines';
const pageSize = '20';

const CACHE_NAME = 'svelte-news';
const CACHE_DURATION = 1800000; // 5 minutes in ms

export async function getNewsByCategory(
  category: Category,
  country: Country,
  page = 1,
  searchTerm?: string,
  invalidate = false
): Promise<void> {
  try {
    isLoading.set(true);
    error.set(null);

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
    }

    if (!data) {
      try {
        const res = await axios.get(url, { headers: options.headers });

        data = res && res.data;

        const expiration = new Date(Date.now() + CACHE_DURATION).toISOString();
        const response = new Response(JSON.stringify(res.data), {
          headers: { 'app-cache-expiration': expiration },
        });

        await cache.put(url, response);
      } catch (err) {
        console.log(err);
        error.set(err.message);
      }
    }

    if (data) {
      const groupedArticlesMap = groupBy(data.articles, (item) =>
        item.publishedAt.substr(0, 10)
      );

      const groups: GroupedArticles = {};
      for (let [key, value] of groupedArticlesMap) groups[key] = value;

      if (invalidate) articles.set(groups);
      else updateArticles(groups);

      totalResults.set(data.totalResults);
    }
  } catch (err) {
    __DEV__ && console.log(err);
    error.set(err.message);
  }

  isLoading.set(false);
}

function updateArticles(newData: GroupedArticles) {
  articles.update((data) => {
    for (const date in newData) {
      data[date] = [...(data[date] ? data[date] : []), ...newData[date]];
    }

    return data;
  });
}

const timer = (time = 1000) =>
  new Promise((res) => setTimeout(() => res(), time));
