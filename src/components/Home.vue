<template>
  <p class="has-text-white title" style="margin-bottom: 60px">
    Welcome to Daunroda!
  </p>

  <p class="has-text-white subtitle is-4">
    A simple tool that lets you download Spotify playlists using YouTube Music,
    for all your offline music needs.
  </p>

  <div v-if="!store.spotifyClient">
    <p class="has-text-white subtitle is-5">
      To continue, please set up Daunroda.
    </p>
  </div>

  <div v-else>
    <router-link to="/download">
      <button class="button is-info">
        <font-awesome-icon class="icon" icon="fa-solid fa-download" />
        <p>Go to Download</p>
      </button>
    </router-link>
  </div>
  <router-link to="/setup">
    <button class="button is-link">
      <font-awesome-icon class="icon" icon="fa-solid fa-wrench" />
      <p>Set up Daunroda</p>
    </button>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { loadConfig, store } from "../store.js";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      store,
    };
  },
  async mounted() {
    await loadConfig();
  },
});
</script>
