import {ref} from "vue";

const typhoon = "typhoon"
const boundary = "boundary"
const wildfire = "wildfire"
const flooding = "flooding"
const tashu = "tashu"

const crtPstMark = "current-position-mark"
const point = "point"
const line = "line"

const baseMap = "base-map"
const noMap = "no-map"
const OSMMap = "osm-map"
const vSatMap = "v-world-sat-map"
const hhiMap = "hhi-map"

const study = "study"
const hhi = "hhi"
const button = ref({
    typhoon : false,
    boundary : false,
    wildfire : false,
    flooding : false,
    point : false,
    line : false
})


export {typhoon, boundary, wildfire, flooding, tashu, crtPstMark, point, line}
export {baseMap, noMap, OSMMap, vSatMap, hhiMap, study, hhi}
export {button}