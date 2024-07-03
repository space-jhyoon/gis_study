import ImageLayer from "ol/layer/Image";
import {ImageWMS, XYZ} from "ol/source";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {key, url, typhoonInfo, boundaryInfo, wildfireInfo, floodingInfo} from "@/assets/js/layerInfoconfig.js";

function getEmptyLayer(){
    let layer;
    layer = new TileLayer({
        name: "default",
        visible: false,
    });
    return layer;
}

function getOSMLayer(){
    let layer;
    layer = new TileLayer({
        name: "osm",
        source: new OSM(),
        visible: false,
        zIndex: 10,
    });
    return layer;
}

function getVWorldSatLayer(url){
    let layer;
    layer = new TileLayer({
        name: "vsat",
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
    let wildfireLayer;
    wildfireLayer = new ImageLayer({
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
    return wildfireLayer;
}

function getAllLayers(){
    let layers = []
    layers = [getEmptyLayer(), getOSMLayer(), getVWorldSatLayer(url.vWorldSat),
                getTyphoonLayer(typhoonInfo), getTyphoonLayer(boundaryInfo),
                getDisasterLayer(wildfireInfo), getDisasterLayer(floodingInfo),]
    return layers
}

export {getAllLayers}