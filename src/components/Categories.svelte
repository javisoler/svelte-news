<script lang="ts">
  import { onMount } from 'svelte';
  import { Category } from '../util/types';

  export let onChange: (category: Category) => void;
  export let selectedCategory: Category;

  let navigation: HTMLElement;

  function handleClick(event) {
    if (onChange) {
      const target = event.target as HTMLLIElement;

      onChange(target.dataset['category'] as Category);

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'center',
      });
      window.scroll({ top: 0 });
    }
  }

  onMount(() => {
    const target = navigation.querySelector('li.active');
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'center',
    });
  });
</script>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 1;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    width: 100%;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
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

  .active {
    background-color: crimson;
    border-bottom-color: crimson;
    font-weight: 700;
  }
</style>

<nav bind:this={navigation}>
  <ul>
    {#each Object.values(Category) as category}
      <li
        class:active={category === selectedCategory}
        on:click={handleClick}
        data-category={category}>
        {category}
      </li>
    {/each}
  </ul>
</nav>
