import { writable } from 'svelte/store';
import type { GroupedArticles } from './types';

export const articles = writable<GroupedArticles>({});

export const isLoading = writable<boolean>(false);

export const totalResults = writable<number>(0);

export const error = writable<string>(null);
