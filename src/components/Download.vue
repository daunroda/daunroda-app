<template>
  <p class="title has-text-white">Hello, {{ store.config.username }}!</p>
  <br />
  <p class="subtitle has-text-white">
    Select the playlists you want to download.
    <br />
    (Don't see a playlist here? Make sure that it's public!)
  </p>

  <div
    v-for="playlist in playlists"
    :key="playlist.name"
    class="playlist subtitle has-text-white is-size-4"
  >
    <label class="checkbox">
      <input
        type="checkbox"
        :value="playlist.id"
        v-model="download"
        style="margin-right: 20px"
      />
      <img
        v-if="playlist.images[0]"
        :src="playlist.images[0].url"
        draggable="false"
      />
      <img v-else src="../assets/no_playlist.png" draggable="false" />
      {{ playlist.name }}
    </label>
  </div>

  <button @click="selectAll()" class="button" style="margin-right: 20px">
    Select all
  </button>
  <button @click="deSelectAll()" class="button">Deselect all</button>

  <div v-if="download.length">
    <button
      @click="startDownload()"
      class="button is-link"
      :disabled="Array.from(progress.values()).some((prog) => !prog.finished)"
    >
      <font-awesome-icon class="icon" icon="fa-solid fa-download" />
      Download
    </button>
  </div>
  <br />

  <div>
    <p id="info">{{ info }}</p>

    <div
      v-for="prog in progress.entries()"
      :key="prog[0]"
      class="downloadProgress"
    >
      {{ prog[1].finished ? "Downloaded" : "Downloading" }} {{ prog[0] }} ({{
        `${prog[1].downloaded}/${prog[1].total}`
      }})
      <progress
        class="progress is-info"
        :value="prog[1].finished ? prog[1].total : prog[1].downloaded"
        :max="prog[1].total"
      ></progress>
      <br />
    </div>
  </div>

  <div class="modal" :class="downloadMaybeQueue.length >= 1 ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-content">
      <p class="has-text-white">
        Found {{ downloadMaybeQueue[0]?.res.name }} on YouTube (named
        {{
          downloadMaybeQueue[0]?.res.name ??
          downloadMaybeQueue[0]?.res.title ??
          ""
        }}) but it was rejected because of {{ downloadMaybeQueue[0]?.reason }}.
        Do you want to download
        <a
          @click="
            open(
              `https://music.youtube.com/watch?v=${downloadMaybeQueue[0]?.res.id}`
            )
          "
        >
          this
        </a>
        anyway?
      </p>
    </div>
    <button class="button is-success" @click="downloadSingle()">
      Download
    </button>
    <button class="button" @click="downloadMaybeQueue.shift()">Cancel</button>
  </div>

  <div :hidden="Array.from(progress.values()).some((prog) => !prog.finished)">
    <router-link to="/" class="button is-primary">
      <font-awesome-icon class="icon" icon="fa-solid fa-house" />
      Go home
    </router-link>
  </div>
</template>

<script lang="ts">
/// <reference types="spotify-api" />

import { defineComponent } from "@vue/runtime-core";
import { ipcRenderer, shell } from "electron";
import { inspect } from "util";
import type { StoreConfig } from "../store.js";
import { loadConfig, store } from "../store.js";
export default defineComponent({
  name: "DownloadPage",
  data(): {
    // eslint-disable-next-line no-undef
    playlists: SpotifyApi.PlaylistBaseObject[];
    store: StoreConfig;
    download: string[];
    progress: Map<
      string,
      { downloaded: number; total: number; finished: boolean }
    >;
    info: string;
    downloadMaybeQueue: {
      res: { name?: string; id?: string; title?: string };
      reason: string;
    }[];
  } {
    return {
      playlists: [],
      store,
      download: [],
      progress: new Map(),
      info: "",
      downloadMaybeQueue: [],
    };
  },
  methods: {
    async startDownload() {
      const config = {
        ...store.config,
        playlists: Array.from(this.download),
      };

      this.progress.clear();
      this.info = "";

      ipcRenderer.invoke("download", config);
    },
    async downloadSingle() {
      const download = this.downloadMaybeQueue.shift();
      ipcRenderer.invoke("downloadSingle", JSON.stringify(download));
    },
    open(url: string) {
      shell.openExternal(url);
    },
    selectAll() {
      this.download = this.playlists.map((playlist) => playlist.id);
    },
    deSelectAll() {
      this.download = [];
    },
  },
  async mounted() {
    await loadConfig();

    this.playlists = await loadPlaylists();
    ipcRenderer.on("progress", (e, prog) =>
      this.progress.set(prog.playlist, {
        downloaded: prog.downloaded,
        total: prog.total,
        finished: prog.finished,
      })
    );

    ipcRenderer.on("info", (e, info) => (this.info += `\n${info}`));
    ipcRenderer.on("error", (e, error) => (this.info += `\n${inspect(error)}`));
    ipcRenderer.on("debug", (e, debug) => console.log(debug));
    ipcRenderer.on("downloadMaybe", (e, download) => {
      download = JSON.parse(download);
      this.downloadMaybeQueue.push(download);
    });
  },
});

async function loadPlaylists() {
  // eslint-disable-next-line no-undef
  const playlists: SpotifyApi.PlaylistBaseObject[] = [];
  let next = true;
  let offset = 0;

  while (next) {
    const {
      body: { items, next: nextURL },
    } = await store.spotifyClient.getUserPlaylists(store.config.username, {
      offset,
    });
    if (!nextURL) next = false;
    else if (nextURL)
      offset = Number(nextURL.split("offset=")[1].split("&")[0]);
    playlists.push(...items);
  }

  return playlists;
}
</script>

<style>
#info {
  white-space: pre-wrap;
}

.playlist input[type="checkbox"] {
  width: 25px;
  height: 25px;
  background: none;
  clip-path: circle(40% at 50% 50%);
}

.playlist img {
  max-height: 70px;
  vertical-align: middle;
}

.button {
  margin-top: 20px;
}
</style>
