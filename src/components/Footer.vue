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
import { shell } from "electron";

export default {
  name: "FooterPage",
  methods: {
    open(url: string) {
      shell.openExternal(url);
    },
  },
};
</script>

<style>
footer {
  margin-top: 100px;
  background-color: #06181d !important;
}
</style>
