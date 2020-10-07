<script lang="ts">
  import { articles } from '../util/articlesStore';

  import Article from './Article.svelte';
</script>

<style>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li.header {
    background-color: rgb(237, 20, 61, 0.9);
    color: white;
    font-size: 13px;
    padding: 8px 10px;
    position: sticky;
    top: 37px;
  }
</style>

{#each Object.keys($articles) as date}
  <ul>
    <li class="header">{new Date(date).toDateString()}</li>

    {#each $articles[date] as article}
      <Article {article} />
    {/each}
  </ul>
{/each}
