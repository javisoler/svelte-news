<script lang="ts">
  import { Country } from '../util/types';
  import countriesList from '../util/countries.json';

  export let onChange: (country: string) => void;
  export let selectedCountry: Country;

  function handleOnChange(country: string) {
    onChange && onChange(country);
  }
</script>

<style>
  div {
    position: relative;
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 5px;
  }

  div::before {
    content: '⌄';
    font-size: 20px;
    position: absolute;
    top: 0;
    right: 5px;
    pointer-events: none;
  }

  select {
    padding: 10px;
    font-size: 12px;
    border: none;
    background: none;
    appearance: none;
    -webkit-appearance: none;
  }
</style>

<!-- svelte-ignore a11y-no-onchange -->
<div>
  <select
    value={selectedCountry}
    on:change={(e) => handleOnChange(e.target.value)}>
    {#each Object.values(Country) as country}
      <option value={country}>{countriesList[country]}</option>
    {/each}
  </select>
</div>
