import ImageLayer from "ol/layer/Image";
import {ImageWMS, XYZ} from "ol/source";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {url, typhoonInfo, boundaryInfo, wildfireInfo, floodingInfo} from "@/assets/js/layerInfoconfig.js";
import {noMap, OSMMap, vSatMap} from "@/assets/js/nameConfig.js";

function getEmptyLayer(){
    let layer;
    layer = new TileLayer({
        name: noMap,
        visible: false,
    });
    return layer;
}

function getOSMLayer(){
    let layer;
    layer = new TileLayer({
        name: OSMMap,
        source: new OSM(),
        visible: false,
        zIndex: 10,
    });
    return layer;
}

function getVWorldSatLayer(url){
    let layer;
    layer = new TileLayer({
        name: vSatMap,
        source: new XYZ({
            url: url,
            crossOrigin: 'anonymous',
        }),
        visible: false,
        zIndex: 10,
    });
    return layer;
}

function getTyphoonLayer(info) {
    let layer;
    layer = new ImageLayer({
        source: new ImageWMS({
            url: info.url,
            params: {
                'LAYERS': info.LAYERS,
                'VIEWPARAMS': info.VIEWPARAMS,
                'STYLES' : info.STYLES
            },
            crossOrigin: 'anonymous',
        }),
        visible: false,
        zIndex: info.zIndex,
        type: info.type
    })
    return layer
}

function getDisasterLayer(info){
    let layer;
    layer = new ImageLayer({
        source: new ImageWMS({
            url: info.url,
            params: {
                'apikey': info.key,
                'LAYERS' : info.LAYERS,
                'STYLES' : info.STYLES,
            },
            crossOrigin: 'anonymous',
        }),
        visible: false,
        zIndex: info.zIndex,
        type: info.type,
    })
    return layer;
}

function getAllLayers(){
    let layers = []
    layers = [getEmptyLayer(), getOSMLayer(), getVWorldSatLayer(url.vWorldSat),
                getTyphoonLayer(typhoonInfo), getTyphoonLayer(boundaryInfo),
                getDisasterLayer(wildfireInfo), getDisasterLayer(floodingInfo)]
    return layers
}

export {getAllLayers}