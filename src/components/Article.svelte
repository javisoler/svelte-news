<script lang="ts">
  import type { Article } from './api';

  export let article: Article;

  let date = article.publishedAt && new Date(article.publishedAt);
  let formattedDate = `${date.toDateString()} ${date
    .toTimeString()
    .substr(0, 5)}`;
</script>

<style>
  a {
    display: flex;
    padding: 10px;
    font-size: 12px;
    border-bottom: 1px solid #f1f1f1;
    transition: background-color 300ms;
    text-decoration: none;
    color: inherit;
  }

  li:hover {
    background-color: #f1f1f1;
  }

  .thumb {
    width: 100px;
    height: 100px;
    background-position: center;
    background-size: cover;
    flex-shrink: 0;
  }

  @media screen and (max-width: 374px) {
    .thumb {
      display: none;
    }
  }

  .body {
    margin-left: 10px;
    flex: 1;
  }

  .top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media screen and (max-width: 690px) {
    .top {
      flex-direction: row;
    }
  }

  .source {
    color: cornflowerblue;
    font-weight: 700;
    font-size: 1.1em;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>

<li>
  <a href={article.url} target="_blank">
    <div
      class="thumb"
      style="background-image: url({article.urlToImage || '/favicon.png'})" />
    <div class="body">
      <div class="top">
        <div class="source">{article.source?.name || ''}</div>
        {#if article.author}
          <div><em>{article.author}</em></div>
        {/if}
      </div>
      <div class="title">{article.title}</div>
      <div>{article.description || ''}</div>
    </div>
  </a>
</li>
