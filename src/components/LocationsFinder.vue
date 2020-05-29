<template>
    <div class="finder">
        <p>Origen:</p> 
        <div class="select is-primary">
            <select name="from" id="from" v-model="from">
                <option v-for="location in locations" :value="location.id" :key="location.id">
                    {{ location.name }}
                </option>
            </select>
        </div>
        <p>Destino:</p> 
        <div class="select is-primary">
            <select name="to" id="to"  v-model="to">
                <option v-for="location in locations" :value="location.id" :key="location.id">
                    {{ location.name }}
                </option>
            </select>
        </div>
        <button
            class="button is-primary finder__search"
            @click="findRoute"
        >
            Ir
        </button>
        <button
            class="button is-primary finder__search"
            @click="checkDirections"
        >
            Direcciones
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Locations } from '@/locations';
import { Location } from '@/types';

@Component({})
export default class LocationsFinder extends Vue {
    public locations: Array<Location> = Locations;
    public from = 1;
    public to = 2;

    public findRoute() {
        const from: Location = this.getLocation(this.from);
        const to: Location = this.getLocation(this.to);
        this.$emit('findRoute', [from, to])
    }

    public checkDirections() {
        this.$emit('displayDirections', true)
    }

    private getLocation(locationId: number): Location {
        return this.locations.find(location => location.id == locationId) as Location;
    }
}
</script>

<style lang="scss" scoped>
    .finder {
        display: flex;
        align-items: center;
        margin-top: 10px;
        p{
            margin: 0 10px;
            font-weight: bold;
        }
        &__search {
            padding: 5px 30px;
            border-radius: 6px;
            margin-left: 20px;
        }
    }
</style>