<template>
  <div id="app">
    <Map
      :apiKey="apiKey"
      :lat="lat"
      :lng="lng"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from './components/Map.vue';

@Component({
  components: {
    Map
  },
})
export default class App extends Vue {
  public lat = 14.634915;
  public lng = -90.506882;
  public apiKey = 'qh42Cu2d0YmsKa2GHD5By6pQPQsGRPcdJHAN_hRXzBk';
}
</script>

<style lang="scss">

</style>
