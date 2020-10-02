import axios from 'axios';
import { groupBy } from '../util/groupBy';

import { articles, isLoading, totalResults } from './articlesStore';
import type { Category, Country, NewsByCategoryRes } from './types';
// import res from '../news.json';

const baseUrlHeadlines = 'https://newsapi.org/v2/top-headlines';

export async function getNewsByCategory(
  category: Category,
  country: Country,
  searchTerm?: string
): Promise<void> {
  try {
    isLoading.set(true);
    const res = await axios.get<NewsByCategoryRes>(
      `${baseUrlHeadlines}?country=${country}&category=${category}${
        searchTerm ? `&q=${searchTerm}` : ''
      }`,
      {
        headers: {
          'X-Api-Key': NEWSAPI_KEY,
        },
      }
    );

    if (res && res.data) {
      const data = res.data as NewsByCategoryRes;

      const groupedArticles = groupBy(data.articles, (item) =>
        item.publishedAt.substr(0, 10)
      );

      const groups = {};
      for (let [key, value] of groupedArticles) groups[key] = value;

      articles.set(groups);
      totalResults.set(res.data.totalResults);
    }

    isLoading.set(false);
  } catch (error) {
    __DEV__ && console.log(error);
  }
}

const timer = (time = 1000) =>
  new Promise((res) => setTimeout(() => res(), time));
