declare global {
  /**
   * Indicates whether the environment is Development
   */
  const __DEV__: boolean;

  /**
   * API key for NewsApi
   */
  const NEWSAPI_KEY: string;
}

export enum Category {
  business = 'business',
  entertainment = 'entertainment',
  general = 'general',
  health = 'health',
  science = 'science',
  sports = 'sports',
  technology = 'technology',
}

export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export interface NewsByCategoryRes {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type GroupedArticles = { [date: string]: Article[] };

export enum Country {
  ae = 'ae',
  ar = 'ar',
  at = 'at',
  au = 'au',
  be = 'be',
  bg = 'bg',
  br = 'br',
  ca = 'ca',
  ch = 'ch',
  cn = 'cn',
  co = 'co',
  cu = 'cu',
  cz = 'cz',
  de = 'de',
  eg = 'eg',
  fr = 'fr',
  gb = 'gb',
  gr = 'gr',
  hk = 'hk',
  hu = 'hu',
  id = 'id',
  ie = 'ie',
  il = 'il',
  in = 'in',
  it = 'it',
  jp = 'jp',
  kr = 'kr',
  lt = 'lt',
  lv = 'lv',
  ma = 'ma',
  mx = 'mx',
  my = 'my',
  ng = 'ng',
  nl = 'nl',
  no = 'no',
  nz = 'nz',
  ph = 'ph',
  pl = 'pl',
  pt = 'pt',
  ro = 'ro',
  rs = 'rs',
  ru = 'ru',
  sa = 'sa',
  se = 'se',
  sg = 'sg',
  si = 'si',
  sk = 'sk',
  th = 'th',
  tr = 'tr',
  tw = 'tw',
  ua = 'ua',
  us = 'us',
  ve = 've',
  za = 'za',
}
