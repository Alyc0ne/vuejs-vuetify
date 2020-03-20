<template>
  <v-app style="background: none;">
     <div class="text-center">
      <v-overlay :value="true" id='Loading' style="z-index:199">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
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
};

$(document).ready(function () {
  setTimeout(() => {
    $('#Loading').css('display', 'none');
  }, 500);
});
</script>

<style>
@import './assets/styles/design.css';
@import './assets/styles/site.css';
@import './assets/styles/mediaControl.css';
@import './assets/styles/modal.css';
</style>
