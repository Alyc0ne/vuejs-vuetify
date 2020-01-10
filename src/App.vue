<template>
  <v-app>
    <Header />
      <div class="layout-page page-with-contextual-sidebar">
        <Main />
      </div>
  </v-app>
</template>

<script>
import Header from '@/components/Shared/Default/Header'
import Main from '@/components/Shared/Default/Main'
import {store} from '@/store/'

export default {
  name: 'App',
  store,
  components: {
    Header,
    Main
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@import './assets/styles/design.css';
@import './assets/styles/site.css';
@import './assets/styles/mediaControl.css';
@import './assets/styles/modal.css';
</style>
