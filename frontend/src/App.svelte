<!-- App.svelte -->
<script>
  import axios from "axios";
  import { onMount } from "svelte";

  let playerTag = "";
  let playerData = null;
  let error = "";

  $: isDataFetched = playerData !== null && playerData.name !== undefined;

  function getPlayerDetails() {
    axios
      .get(`http://localhost:3000/${playerTag}`)
      .then((response) => {
        playerData = response.data;
        error = "";
      })
      .catch((err) => {
        error = err.response.data.message;
        playerData = null;
      });
  }

  onMount(() => {
    getPlayerDetails();
  });
</script>

<div class="container">
  <div class="form">
    <input
      type="text"
      class="form__input"
      placeholder="Enter Player Tag"
      bind:value={playerTag}
    />
    <button class="form__submit" on:click={getPlayerDetails}>Get Details</button
    >
  </div>

  {#if error}
    <div class="error">{error}</div>
  {:else if isDataFetched}
    <div class="details">
      <div class="details__item">
        <div class="details__title">Player Name</div>
        <div class="details__value">{playerData.name}</div>
      </div>
      <div class="details__item">
        <div class="details__title">Trophies</div>
        <div class="details__value">{playerData.trophies}</div>
      </div>
      <div class="details__item">
        <div class="details__title">Highest Trophies</div>
        <div class="details__value">{playerData.highestTrophies}</div>
      </div>
      <div class="details__item">
        <div class="details__title">Power Play Points</div>
        <div class="details__value">{playerData.powerPlayPoints}</div>
      </div>
      <div class="details__item">
        <div class="details__title">Club Name</div>
        <div class="details__value">{playerData.club?.name || "-"}</div>
      </div>
      <div class="details__item">
        <div class="details__title">Club Tag</div>
        <div class="details__value">{playerData.club?.tag || "-"}</div>
      </div>
      <div class="details__item">
        <div class="details__title">3v3 Victories</div>
        <div class="details__value">{playerData["3vs3Victories"]}</div>
      </div>
      <div class="details__item">
        <div class="details__title">Solo Victories</div>
        <div class="details__value">{playerData.soloVictories}</div>
      </div>
      <div class="details__item">
        <div class="details__title">Duo Victories</div>
        <div class="details__value">{playerData.duoVictories}</div>
      </div>
    </div>
  {/if}
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .form__input {
    font-size: 20px;
    padding: 10px;
    margin-right: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 300px;
    max-width: 100%;
    box-shadow: 1px 1px 3px #ccc;
  }

  .form__submit {
    background-color: #f44336;
    color: white;
    font-size: 20px;
    padding: 10px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    box-shadow: 1px 1px 3px #ccc;
  }

  .form__submit:hover {
    background-color: #d32f2f;
  }

  .error {
    color: red;
    margin-bottom: 20px;
  }

  .details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
  }

  .details__item {
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 1px 1px 3px #ccc;
  }

  .details__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .details__value {
    font-size: 20px;
  }

  @media screen and (max-width: 767px) {
    .form__input {
      margin-bottom: 10px;
    }

    .form__submit {
      width: 100%;
    }

    .details {
      grid-template-columns: 1fr;
    }
  }
</style>
