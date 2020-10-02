<script lang="ts">
  export let onSubmit: (value: string) => void;
  export let value: string;
</script>

<style>
  form {
    display: inline;
  }
  input {
    padding: 11px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    font-size: 12px;
  }
</style>

<form
  on:submit|preventDefault={() => {
    onSubmit && onSubmit(value);
  }}>
  <input bind:value placeholder="Search term..." />
</form>
