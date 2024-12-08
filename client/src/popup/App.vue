<template>
  <div id="app">
    <HomeViewer />
    <Weather/>
  </div>
</template>

<script>
// import NasaData from './components/NasaData.vue';
import HomeViewer  from '../components/Home.vue';
import Weather from '../components/Weather.vue';

export default {
  name: 'App',
  components: {
    HomeViewer,
    Weather
  },
};
</script>