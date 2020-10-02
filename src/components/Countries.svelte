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
  select {
    padding: 10px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    font-size: 12px;
    margin-left: 10px;
  }
</style>

<!-- svelte-ignore a11y-no-onchange -->
<select
  value={selectedCountry}
  on:change={(e) => handleOnChange(e.target.value)}>
  {#each Object.values(Country) as country}
    <option value={country}>{countriesList[country]}</option>
  {/each}
</select>
