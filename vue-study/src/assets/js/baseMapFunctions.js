import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {XYZ} from "ol/source";
import {fromLonLat} from 'ol/proj'

let apiKey = "ADF647B7-C03B-3445-AFE7-1FC99687F8F6";

function createBaseMaps(){
    let map;
    map = new Map({
        view: new View({
            center: fromLonLat([127.1388684, 37.4449168]),
            zoom: 7,
        }),
        controls: [],
        layers: [
            getNoMap()
        ],
        target: 'base-map',
    });
    map.addLayer(getOSMMap())
    map.addLayer(getVSatMap())
    return map;
}

function showMapLayer(map, name){
    map.getLayers().getArray().slice().forEach((layer) => {
        if (layer.get('name') === name) {
            layer.setVisible(true);
        }
        else{
            layer.setVisible(false);
        }
    })
}

function getNoMap(){
    let layer;
    layer = new TileLayer({
        name: "default",
        visible: false,
    });
    return layer;
}

function getOSMMap(){
    let layer;
    layer = new TileLayer({
        name: "osm",
        source: new OSM(),
        visible: false,
    });
    return layer;
}

function getVSatMap(){
    let layer;
    layer = new TileLayer({
        name: "vsat",
        source: new XYZ({
            url:"http://api.vworld.kr/req/wmts/1.0.0/" + apiKey + "/Satellite/{z}/{y}/{x}.jpeg",
            crossOrigin: 'anonymous',
        }),
        visible: false,
    });
    return layer;
}


export {createBaseMaps, showMapLayer}