import { fetch, FetchMethods, FetchResultTypes } from "@sapphire/fetch";
import type { Config } from "daunroda/dist/lib/Daunroda";
import { readFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import spotify from "spotify-web-api-node";
import { reactive } from "vue";

export async function loadConfig() {
  if (store.spotifyClient) return;
  const data = await readFile(`${homedir()}/.daunroda-app-config.json`)
    .then((buffer) => (buffer ? JSON.parse(buffer.toString()) : null))
    .catch(() => null);
  if (data) {
    store.config = data;
    await loginSpotify();
  }
}

export async function loginSpotify() {
  const client = new spotify({
    clientId: store.config.spotifyClientID,
    clientSecret: store.config.spotifySecret,
  });

  const auth = `Basic ${Buffer.from(
    `${store.config.spotifyClientID}:${store.config.spotifySecret}`
  ).toString("base64")}`;

  const { access_token } = (await fetch(
    "https://accounts.spotify.com/api/token?grant_type=client_credentials",
    {
      method: FetchMethods.Post,
      headers: {
        Authorization: auth,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
    FetchResultTypes.JSON
  )) as { access_token: string };

  client.setAccessToken(access_token);

  store.config.accessToken = access_token;
  store.spotifyClient = client;
}

export const store = reactive({
  config: {
    downloadTo: join(homedir(), "daunroda"),
  },
} as StoreConfig);

export interface StoreConfig {
  spotifyClient: spotify;
  config: Config & {
    username: string;
  };
}
