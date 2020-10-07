<script lang="ts">
  import { Category } from '../util/types';

  export let onChange: (category: Category) => void;
  export let selectedCategory: Category;

  function handleClick(category: Category) {
    onChange && onChange(category);
  }
</script>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  li {
    padding: 0 15px;
    height: 35px;
    background-color: darkslategrey;
    color: white;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #909090;
    border-right: 1px solid #909090;
    border-bottom: 1px solid #909090;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 300;
    transition: background-color 300ms;
    user-select: none;
  }

  li:last-child {
    border-right: 0;
  }

  li:hover:not(.active) {
    background-color: lightslategrey;
    cursor: pointer;
  }

  @media screen and (max-width: 690px) {
    ul {
      flex-direction: column;
    }
    li {
      border-top: none;
      border-right: none;
      flex-basis: 20px;
    }
  }

  .active {
    background-color: crimson;
    border-bottom-color: crimson;
    font-weight: 700;
  }
</style>

<nav>
  <ul>
    {#each Object.values(Category) as category}
      <li
        class:active={category === selectedCategory}
        on:click={() => handleClick(category)}>
        {category}
      </li>
    {/each}
  </ul>
</nav>
