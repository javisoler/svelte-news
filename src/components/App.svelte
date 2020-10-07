<script lang="ts">
  import { onMount } from 'svelte';

  import Categories from './Categories.svelte';
  import Countries from './Countries.svelte';
  import Input from './Input.svelte';
  import List from './List.svelte';
  import Loader from './Loader.svelte';

  import { Category, Country } from '../util/types';
  import { getHeadlines } from '../util/api';
  import { pageSize } from '../util/constants';
  import { isLoading, error, totalResults } from '../stores/articles';

  let selectedCategory = Category.technology;
  let selectedCountry = Country.gb;
  let searchTerm = undefined;
  let page = 1;

  $: hasMore = $totalResults > page * pageSize;

  onMount(() => fetchNews());

  function fetchNews(invalidate = false) {
    getHeadlines(
      selectedCategory,
      selectedCountry,
      page,
      searchTerm,
      invalidate
    );
  }

  function onCategoryChange(category: Category) {
    selectedCategory = category;
    page = 1;
    fetchNews(true);
  }

  function onCountryChange(country: Country) {
    selectedCountry = country;
    page = 1;
    fetchNews(true);
  }

  function onSearchTermChange(term: string) {
    searchTerm = term;
    page = 1;
    fetchNews(true);
  }

  function onScrollWindow() {
    const shouldLoadMore =
      window.pageYOffset + document.body.clientHeight >
      document.body.scrollHeight - 100;

    if (hasMore && shouldLoadMore && !$isLoading) {
      page = page + 1;
      fetchNews();
    }
  }
</script>

<style>
  .top-bar {
    display: flex;
    align-items: center;
    padding: 20px 10px 15px;
  }
  h1 {
    margin: 0;
    color: crimson;
    text-shadow: 3px 4px 8px rgb(0 0 0 / 50%);
    font-size: 2.8em;
    text-transform: uppercase;
    font-family: serif;
  }
  .info {
    text-align: center;
    padding: 20px;
  }
  .inputs {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
  }
</style>

<svelte:window on:scroll={onScrollWindow} />

<main>
  <div class="top-bar">
    <h1>News!</h1>
    <div class="inputs">
      <Input onSubmit={onSearchTermChange} />
      <Countries onChange={onCountryChange} {selectedCountry} />
    </div>
  </div>

  <Categories onChange={onCategoryChange} {selectedCategory} />

  {#if $isLoading}
    <Loader />
  {/if}

  {#if !$isLoading && $error}
    <div class="info">{$error}</div>
  {/if}

  {#if $totalResults === 0 && !$isLoading && !$error}
    <div class="info">No results!</div>
  {:else}
    <List />
  {/if}

  {#if hasMore}
    <Loader />
  {/if}
</main>
