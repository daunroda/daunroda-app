# Daunroda

![Daunroda](https://i.imgur.com/F3H2vci.png)

The Spotify to YouTube Music downloader that doesn't download all kinds of
bullshit from YouTube (karaoke/instrumental versions, music video versions etc)

[Preview](https://youtu.be/wE3au2PUj10)

## Features

- Spotify metadata embedded in files
- Playlist file creation (.m3u8)
- Concurrent music downloading from YouTube
- Auto-updating

## Usage

- Download the installer for your OS of choice from the Releases tab or from the following list
  - [Windows 7+ (Multi-architecture)](https://github.com/daunroda/daunroda-app/releases/latest/download/Daunroda-v0.0.1-alpha.9-win.exe) (This download is larger than any specific architecture download - 251 MB!)
  - [Windows 7+ (x86/32-bit)](https://github.com/daunroda/daunroda-app/releases/latest/download/Daunroda-v0.0.1-alpha.9-win-ia32.exe)
  - [Windows 7+ (x64/64-bit)](https://github.com/daunroda/daunroda-app/releases/latest/download/Daunroda-v0.0.1-alpha.9-win-x64.exe)
  - [Windows 10+ (ARM64)](https://github.com/daunroda/daunroda-app/releases/latest/download/Daunroda-v0.0.1-alpha.9-win-arm64.exe)
  - [macOS 10.13+ (Universal 2 Binary)](https://github.com/daunroda/daunroda-app/releases/latest/download/Daunroda-v0.0.1-alpha.9-mac-universal.dmg)
  - [Linux (x86_64)](https://github.com/daunroda/daunroda-app/releases/latest/download/Daunroda-v0.0.1-alpha.9-linux-x86_64.AppImage)
  - [Linux (ARMv7)](https://github.com/daunroda/daunroda-app/releases/latest/download/Daunroda-v0.0.1-alpha.9-linux-armv7l.AppImage)
  - [Linux (ARM64)](https://github.com/daunroda/daunroda-app/releases/latest/download/Daunroda-v0.0.1-alpha.9-linux-arm64.AppImage)

OR

- Build it yourself: 
  * Install [Node.js](https://nodejs.org/) (v18.0.0 or newer) 
  * Clone this repository
  * Run the following commands:
  * `corepack enable`
  * `yarn install`
  * `yarn dev` to run Daunroda without compiling or `yarn build` to build an installer

### Credits 
- Vue boilerplate used: [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue)
