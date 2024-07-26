import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj'
import {getAllLayers} from "@/assets/js/layer/makeLayers.js";
import {baseMap, hhiMap, noMap, OSMMap, vSatMap} from "@/assets/js/nameConfig.js";
import TileLayer from "ol/layer/Tile";
import {XYZ} from "ol/source";
import {url} from "@/assets/js/layer/layerInfoconfig.js";
import {removeMarkLayer} from "@/assets/js/showMark.js";

function createBaseMap(){
    let map;
    map = new Map({
        view: new View({
            projection: "EPSG:4326",
            zoom: 7,
            center: [127, 37],
            constrainResolution: false,
            extent: [117.5, 29.53522956294847, 145, 45.089]
        }),
        controls: [],
        layers: [new TileLayer({
            source: new XYZ({
                url: url.vworldLayer,
                crossOrigin: 'anonymous',
            }),
            visible: true,
            zIndex: 10,
        })],
        target: hhiMap,
    });
    return map;
}


function createAllLayers(){
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
        if(layer.get('type') === noMap || layer.get('type') || OSMMap && layer.get('type') || vSatMap){
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

function focusOnCrtPosition(map, lonlat){
    map.getView().setCenter(lonlat)
    map.getView().setZoom(15)
}

function resetSettings(map){
    removeMarkLayer(map)
    map.getView().setCenter([127.1388684, 37.4449168])
    map.getView().setZoom(7)
}

export {createBaseMap, createAllLayers, showLayer, toggleLayer, focusOnCrtPosition, resetSettings}