<script lang="ts">
  import { onMount } from 'svelte';

  import Categories from './Categories.svelte';
  import Countries from './Countries.svelte';
  import Input from './Input.svelte';
  import List from './List.svelte';

  import { Category, Country } from '../util/types';
  import { getNewsByCategory } from '../util/api';
  import { isLoading, totalResults } from '../util/articlesStore';

  let selectedCategory = Category.technology;
  let selectedCountry = Country.gb;
  let searchTerm = undefined;

  onMount(() => fetchNews());

  function fetchNews() {
    getNewsByCategory(selectedCategory, selectedCountry, searchTerm);
  }

  function onCategoryChange(category: Category) {
    selectedCategory = category;
    fetchNews();
  }

  function onCountryChange(country: Country) {
    selectedCountry = country;
    fetchNews();
  }

  function onSearchTermChange(term: string) {
    searchTerm = term;
    fetchNews();
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
    <div class="info">Loading...</div>
  {/if}

  {#if $totalResults === 0 && !$isLoading}
    <div class="info">No results!</div>
  {:else}
    <List />
  {/if}
</main>
