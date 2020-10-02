import { writable } from 'svelte/store';
import type { Article } from './types';

export const articles = writable<{ [date: string]: Article[] }>({});

export const isLoading = writable<boolean>(false);

export const totalResults = writable<number>(0);
