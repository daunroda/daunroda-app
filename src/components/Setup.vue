<template>
  <p class="has-text-white subtitle is-4">
    Welcome to the Daunroda configurator!
  </p>

  <div id="forms">
    <!-- Download to -->
    <p class="has-text-white">
      Select the folder you want Daunroda to download to:
    </p>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          class="input"
          type="text"
          :value="store.config.downloadTo"
          disabled
        />
      </div>
      <div class="control">
        <a
          @click="selectFolder()"
          class="button is-info"
          style="margin-top: 0px"
        >
          <font-awesome-icon class="icon" icon="fa-regular fa-folder" />
          Select folder
        </a>
      </div>
    </div>

    <p class="has-text-white">
      Input the Client ID of your Spotify application:
      <a @click="open('https://developer.spotify.com/dashboard/applications')">
        (create one here)
      </a>
    </p>
    <input
      class="input"
      type="text"
      v-model="store.config.spotifyClientID"
      required
      placeholder="Spotify Client ID"
    />
    <p class="has-text-white">
      Input the Client Secret of your Spotify application:
    </p>
    <input
      class="input"
      type="text"
      v-model="store.config.spotifySecret"
      required
      placeholder="Spotify Client Secret"
    />

    <p class="has-text-white">Input your Spotify username:</p>
    <input
      class="input"
      type="text"
      v-model="store.config.username"
      required
      placeholder="Spotify username"
    />

    <p class="has-text-white">
      Select the format you want the music to be downloaded as:
    </p>
    <div class="select">
      <select v-model="store.config.audioContainer">
        <option>mp3</option>
        <option>flac</option>
      </select>
    </div>

    <div :hidden="store.config.audioContainer == 'flac'">
      <p class="has-text-white">Select the audio bitrate for MP3 downloads:</p>
      <input
        class="input"
        type="number"
        v-model="store.config.audioBitrate"
        required
        placeholder="128"
      />
    </div>

    <p class="has-text-white">
      Select the maximum difference percentage between the Spotify version and
      YouTube Music version in duration (for auto-downloading):
    </p>
    <input
      class="input"
      type="number"
      v-model="store.config.difference"
      required
      placeholder="10"
    />

    <label class="checkbox">
      <input
        type="checkbox"
        v-model="store.config.allowForbiddenWording"
        :true-value="true"
        :false-value="false"
      />
      Automatically download songs that contain forbidden wording on YouTube
      (such as live, karaoke, instrumental etc)
    </label>
    <br /><br />

    <div class="notification is-success" :hidden="!success">
      Configuration saved successfully.
    </div>

    <a @click="saveConfig()" class="button is-info">
      <font-awesome-icon class="icon" icon="fa-regular fa-floppy-disk" />
      Save configuration
    </a>
    <br />
    <p class="has-text-danger">{{ error }}</p>
  </div>

  <div class="go-home">
    <router-link to="/" class="button is-primary">
      <font-awesome-icon class="icon" icon="fa-solid fa-house" />
      Go home
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ipcRenderer, shell } from "electron";
import { writeFile } from "fs/promises";
import { homedir } from "os";
import { setTimeout } from "timers/promises";
import { loadConfig, store } from "../store.js";

export default defineComponent({
  name: "SetupPage",
  methods: {
    selectFolder() {
      ipcRenderer
        .invoke("showDialog")
        .then((path) => (this.store.config.downloadTo = path));
    },
    open(url: string) {
      shell.openExternal(url);
    },
    async saveConfig() {
      this.error = "";
      if (
        (store.config.audioContainer == "mp3"
          ? !store.config.audioBitrate
          : true) ||
        !store.config.audioContainer ||
        !store.config.difference ||
        !store.config.downloadTo ||
        !store.config.spotifyClientID ||
        !store.config.spotifySecret ||
        !store.config.username
      )
        return (this.error =
          "Error: please fill everything out before saving!");
      await writeFile(
        `${homedir()}/.daunroda-app-config.json`,
        JSON.stringify(this.store.config)
      );
      await loadConfig().catch((err) => (this.error = err));
      this.success = true;
      await setTimeout(3000);
      this.success = false;
    },
  },
  data() {
    return {
      store,
      error: "",
      success: false,
    };
  },
});
</script>

<style>
.input {
  margin-bottom: 10px;
}

.checkbox:hover {
  color: rgb(230, 221, 221) !important;
}

.select {
  margin-bottom: 10px;
}

#forms {
  text-align: left;
}

.go-home {
  text-align: left;
  margin-top: 20px;
}
</style>
