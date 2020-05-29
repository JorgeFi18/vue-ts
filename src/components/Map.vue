<template>
    <div class="map">
        <Directions
            v-if="displayDirections"
            :directions="directions"
            @closeModal="displayDirections = false"
        />
        <LocationFinder
            @findRoute="getRoute"
            @displayDirections="displayDirections = true"
        />
        <div ref="map" class="map__content"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Dictionary } from '@/types';
import LocationFinder from '@/components/LocationsFinder.vue';
import Directions from '@/components/Directions.vue';

// eslint-disable-next-line
declare var H: any;

@Component({
    components: {
        LocationFinder,
        Directions
    }
})
export default class Map extends Vue {
    @Prop({type: String}) readonly apiKey!: string;
    @Prop({type: Number}) readonly lat!: number;
    @Prop({type: Number}) readonly lng!: number;


    public map: Dictionary = {};
    public platform: Dictionary = {};
    public geoCoder: any = {};
    public router: Dictionary = {};
    public directions: Array<any> = [];
    public displayDirections = false;

    private routingParameters: Dictionary = {
        routingMode: 'fast',
        transportMode: 'car',
        return: 'polyline,actions,instructions,summary',
        alternatives: 5
    }

    created() {
        this.platform = new H.service.Platform({
            'apikey': this.apiKey
        });
        this.geoCoder = this.platform.getSearchService();
    }

    mounted() {
        console.log(this.platform);
        this.map = new H.Map(
            this.$refs.map,
            this.platform.createDefaultLayers().vector.normal.map,
            {
                zoom: 10,
                center: { lng: this.lng, lat: this.lat }
            }
        )

        const ui = H.ui.UI.createDefault(this.map, this.platform.createDefaultLayers());
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.router = this.platform.getRoutingService(null, 8);
    }

    private onResult(result: Dictionary): void {
        this.map.removeObjects(this.map.getObjects());
        if(result.routes.length) {
            result.routes[0].sections.forEach((section: Dictionary) => {
                this.getDirections(section.actions);
                const linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                const routeLine = new H.map.Polyline(linestring, {
                    style: { strokeColor: 'blue', lineWidth: 6 }
                });

                const startMarker = new H.map.Marker(section.departure.place.location);

                const endMarker = new H.map.Marker(section.arrival.place.location);

                this.map.addObjects([routeLine, startMarker, endMarker]);

                this.map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()})
            })
        }
    }

    public getRoute([from, to]: Array<Dictionary>): void {
        this.setRoutingParameters(from, to);
        this.router.calculateRoute(this.routingParameters, this.onResult, 
            function (error: Dictionary) {
                alert(error.message)
            }
        )
    }

    private getDirections(actions: any[]) {
        this.directions = [];
        actions.forEach(action => {
            this.directions.push(action.instruction);
        })
    }

    private setRoutingParameters(from: Dictionary, to: Dictionary): void { 
        this.routingParameters.origin = `${from.lat},${from.lng}`;
        this.routingParameters.destination = `${to.lat},${to.lng}`;
    }

}
</script>
  
<style lang="scss" scoped>
    .map {
        &__content {
            height: calc(100vh - 70px);
            width: 90vw;
            border: 2px solid black;
            margin: 10px auto;
        }
    }
</style>