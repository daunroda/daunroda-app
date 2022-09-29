<template>
  <footer class="footer">
    <div class="content has-text-centered has-text-white">
      <p>
        Daunroda by
        <a @click="open('https://github.com/alexthemaster')">Alex Kovacs</a>.
        The source code is licensed under the
        <a @click="open('https://choosealicense.com/licenses/mit/')">MIT</a>
        license. This app's source code is available on
        <a @click="open('https://github.com/daunroda/daunroda-app')">
          <font-awesome-icon icon="fa-brands fa-github" />
          GitHub
        </a>
        <br />
        {{ version }}
      </p>
      <a @click="open('https://bulma.io')">
        <img
          src="https://bulma.io/images/made-with-bulma--dark.png"
          alt="Made with Bulma"
          width="128"
          height="24"
        />
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ipcRenderer, shell } from "electron";

export default defineComponent({
  name: "FooterPage",
  methods: {
    open(url: string) {
      shell.openExternal(url);
    },
  },
  data() {
    return {
      version: "Loading version...",
    };
  },
  beforeMount() {
    ipcRenderer
      .invoke("version")
      .then((version) => (this.version = `v${version}`));
  },
});
</script>

<style>
footer {
  margin-top: 100px;
  background-color: #06181d !important;
}
</style>
