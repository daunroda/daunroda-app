<template>
    <div id="app" class="container content">
        <img alt="Daunroda logo" src="./assets/logo.png" id="logo">
        <router-view></router-view>
    </div>
    <FooterPage></FooterPage>

</template>

<script lang="ts">
import FooterPage from './components/Footer.vue';

export default {
    name: "App",
    components: { FooterPage }
}
</script>

<style>
#app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    margin-top: 60px;
}

#logo {
    max-height: 100px;
    margin-bottom: 60px;
}

.icon {
    margin-right: 5px !important;
    max-height: 20px;
}
</style>