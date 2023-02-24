<script>
  import axios from 'axios';
  let data = {};
  let playerTag = '';

  function getPlayerDetails() {
    console.log(playerTag);

    axios.get("http://localhost:3000/%23"+playerTag)
      .then(function (response) {
        console.log(response.data);
        data = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  playerTag = '';
</script>

<style>

</style>

<h1>Input Player Tag</h1>
<h5>Without "#"</h5>
<input type="text" name="player-tag" id="player-tag-input" bind:value={playerTag}>
<button on:click={getPlayerDetails}>Search Player</button>

{#if data.name}
  <h1>Player Name: {data.name}</h1>
  <h3>Expirience: {data.expLevel}</h3>
  <h3>Trophies: {data.trophies}</h3>
  <h3>Highest Trophies: {data.highestTrophies}</h3>
{/if}