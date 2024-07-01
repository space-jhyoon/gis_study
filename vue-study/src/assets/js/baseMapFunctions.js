import Map from 'ol/Map';
import View from 'ol/View';

import {fromLonLat} from 'ol/proj'
import {getEmptyLayer, getOSMLayer, getVWorldSatLayer, getTyphoonLayer, getBoundaryLayer} from "@/assets/js/makeLayers.js";

function createBaseMaps(){
    let map;
    map = new Map({
        view: new View({
            center: fromLonLat([127.1388684, 37.4449168]),
            zoom: 7,
        }),
        controls: [],
        layers: [
            getEmptyLayer(),
            getOSMLayer(),
            getVWorldSatLayer(),
            getTyphoonLayer(),
            getBoundaryLayer(),
        ],
        target: 'base-map',
    });
    return map;
}

function showLayer(map, name){
    map.getLayers().getArray().slice().forEach((layer) => {
        if(layer.get('type') !== "typhoon_geom_layer" && layer.get('type') !== "typhoon_boundary_layer"){
            if (layer.get('name') === name) {
                layer.setVisible(true);
            }
            else if (layer.get('name') !== name){
                layer.setVisible(false);
            }
        }
    })
}

function toggleTyphoonLayer(map, name, state) {
    map.getLayers().getArray().find((layer) => {
        if(layer.get('type') === name) {
            layer.setVisible(state);
        }
    })
}


export {createBaseMaps, showLayer, toggleTyphoonLayer}