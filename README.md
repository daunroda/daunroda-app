# Daunroda

![Daunroda](https://i.imgur.com/F3H2vci.png)

The Spotify to YouTube Music downloader that doesn't download all kinds of
bullshit from YouTube (karaoke/instrumental versions, music video versions etc)

[Preview](https://youtu.be/wE3au2PUj10)

## Features

- Spotify metadata embedded in files
- Playlist file creation (.m3u8)
- Concurrent music downloading from YouTube

## Usage

1. Windows: download executable for Windows from Releases tab 
1. Built it yourself: 
* Install [Node.js](https://nodejs.org/) (v18.0.0 or newer) 
* Clone this repository
* Run the following commands:
* `corepack enable`
* `yarn dev` to run Daunroda without compiling or `yarn build` to build an installer

### Credits 
- Vue boilerplate used: [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue)