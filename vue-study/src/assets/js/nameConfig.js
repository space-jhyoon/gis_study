import {ref} from "vue";

const typhoon = "typhoon"
const boundary = "boundary"
const wildfire = "wildfire"
const flooding = "flooding"
const point = "point"
const line = "line"

const baseMap = "base-map"
const noMap = "no-map"
const OSMMap = "osm-map"
const vSatMap = "v-world-sat-map"

const button = ref({
    typhoon : false,
    boundary : false,
    wildfire : false,
    flooding : false,
    point : false,
    line : false
})


export {typhoon, boundary, wildfire, flooding, point, line}
export {baseMap, noMap, OSMMap, vSatMap}
export {button}