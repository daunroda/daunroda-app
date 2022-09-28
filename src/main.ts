import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFloppyDisk, faFolder } from "@fortawesome/free-regular-svg-icons";
import {
  faDownload,
  faHouse,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faWrench, faGithub, faFolder, faFloppyDisk, faHouse, faDownload);

// Components
import App from "./App.vue";
import DownloadPage from "./components/Download.vue";
import HomePage from "./components/Home.vue";
import SetupPage from "./components/Setup.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/setup", component: SetupPage },
  { path: "/download", component: DownloadPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
