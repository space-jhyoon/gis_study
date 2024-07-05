import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj'
import {getAllLayers} from "@/assets/js/makeLayers.js";
import {boundaryInfo, floodingInfo, typhoonInfo, wildfireInfo} from "@/assets/js/layerInfoconfig.js";
import {baseMap, boundary, flooding, line, point, typhoon, wildfire} from "@/assets/js/nameConfig.js";

function createBaseMaps(){
    let map;
    map = new Map({
        view: new View({
            center: fromLonLat([127.1388684, 37.4449168]),
            zoom: 7,
        }),
        controls: [],
        layers: getAllLayers(),
        target: baseMap,
    });
    return map;
}

function showLayer(map, name){
    map.getLayers().getArray().slice().forEach((layer) => {
        if(layer.get('type') !== typhoon && layer.get('type') !== boundary && layer.get('type') !== wildfire &&
            layer.get('type') !== flooding && layer.get('type') !== point && layer.get('type') !== line){
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