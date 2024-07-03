import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj'
import {getAllLayers} from "@/assets/js/makeLayers.js";
import {boundaryInfo, floodingInfo, typhoonInfo, wildfireInfo} from "@/assets/js/layerInfoconfig.js";

function createBaseMaps(){
    let map;
    map = new Map({
        view: new View({
            center: fromLonLat([127.1388684, 37.4449168]),
            zoom: 7,
        }),
        controls: [],
        layers: getAllLayers(),
        target: 'base-map',
    });
    return map;
}

function showLayer(map, name){
    map.getLayers().getArray().slice().forEach((layer) => {
        if(layer.get('type') !== typhoonInfo.type && layer.get('type') !== boundaryInfo.type &&
            layer.get('type') !== wildfireInfo.type && layer.get('type') !== floodingInfo.type){
            if (layer.get('name') === name) {
                layer.setVisible(true);
            }
            else if (layer.get('name') !== name){
                layer.setVisible(false);
            }
        }
    })
}

function toggleLayer(map, name, state){
    map.getLayers().getArray().find((layer) => {
        if(layer.get('type') === name) {
            layer.setVisible(state);
        }
    })
}

export {createBaseMaps, showLayer, toggleLayer}