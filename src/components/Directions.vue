<template>
    <div class="overlay">
        <button class="close-button" @click="closeModal">
            x
        </button>
        <div class="content">
            <h2>Direcciones</h2>
            <ul>
                <li v-for="(direction, index) in directions" :key="index">
                    {{ direction }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Directions extends Vue {
    @Prop({default: []}) readonly directions!: Array<string>;

    public closeModal() {
        this.$emit('closeModal', true)
    }
}
</script>

<style lang="scss" scoped>
.overlay {
    position: absolute;
    z-index: 8;
    width: 100%;
    background-color: rgba(0,0,0,.4);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .close-button {
        background: transparent;
        border: none;
        outline: none;
        color: white;
        font-weight: bold;
        font-size: 34px;
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        background-color: white;
        width: 700px;
        height: 500px;
        overflow-y: auto;
        padding: 20px;
        li {
            font-weight: bold;
        }
    }
}
</style>