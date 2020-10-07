import axios from 'axios';
import { groupBy } from '../util/groupBy';

import { articles, isLoading, error, totalResults } from '../stores/articles';

import {
  pageSize,
  baseUrlHeadlines,
  requestOptions,
  CACHE_DURATION,
  CACHE_NAME,
} from './constants';

import type {
  Category,
  Country,
  GroupedArticles,
  NewsByCategoryRes,
} from './types';

/**
 * Get Headlines based on the provided filters
 *
 * @param category
 * @param country
 * @param page
 * @param searchTerm
 * @param invalidate
 */
export async function getHeadlines(
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
      pageSize: String(pageSize),
      page: String(page),
    });
    if (searchTerm) urlParams.append('searchTerm', searchTerm);

    const urlObj = new URL(baseUrlHeadlines);
    urlObj.search = urlParams.toString();

    const url = urlObj.toString();

    data = await getCachedData(url);

    if (!data) data = await fetchHeadlines(url);

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

/**
 * Get cached data for the url.
 *
 * @param url
 */
async function getCachedData(url: string) {
  let data: NewsByCategoryRes;

  try {
    const cachedRes = await caches.match(url);

    if (cachedRes) {
      const expiration = cachedRes.headers.get('app-cache-expiration');

      if (expiration && new Date(expiration) > new Date())
        data = await cachedRes.json();
    }
  } catch (err) {
    console.log(err);
    error.set(err.message);
  }

  return data;
}

/**
 * Fetch data from the API and store it in the cache.
 *
 * @param url
 */
async function fetchHeadlines(url: string) {
  let data: NewsByCategoryRes;

  try {
    const res = await axios.get(url, { headers: requestOptions.headers });

    data = res && res.data;

    const expiration = new Date(Date.now() + CACHE_DURATION).toISOString();
    const response = new Response(JSON.stringify(res.data), {
      headers: { 'app-cache-expiration': expiration },
    });

    const cache = await caches.open(CACHE_NAME);
    await cache.put(url, response);
  } catch (err) {
    console.log(err);
    error.set(err.message);
  }

  return data;
}

/**
 * Append new data to the existing lists of articles
 *
 * @param newData
 */
function updateArticles(newData: GroupedArticles) {
  articles.update((data) => {
    for (const date in newData) {
      data[date] = [...(data[date] ? data[date] : []), ...newData[date]];
    }

    return data;
  });
}
