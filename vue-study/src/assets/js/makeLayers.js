import ImageLayer from "ol/layer/Image";
import {ImageWMS, XYZ} from "ol/source";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

let apiKey = "ADF647B7-C03B-3445-AFE7-1FC99687F8F6";
let geoserverURL = "http://dev.spaceware.kr/geoserver/etri_sat/wms";

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
    });
    layer.setZIndex(10);
    return layer;
}

function getVWorldSatLayer(){
    let layer;
    layer = new TileLayer({
        name: "vsat",
        source: new XYZ({
            url:"http://api.vworld.kr/req/wmts/1.0.0/" + apiKey + "/Satellite/{z}/{y}/{x}.jpeg",
            crossOrigin: 'anonymous',
        }),
        visible: false,
    });
    layer.setZIndex(10);
    return layer;
}

function getTyphoonLayer() {
    let typhoonLayer = new ImageLayer({
        source: new ImageWMS({
            url: geoserverURL,
            params: {
                'LAYERS': "etri_sat:typhoon_polygon",
                'VIEWPARAMS': `typ_num:2306;agency:"RKSL";`
            },
            crossOrigin: 'anonymous',
        }),
        visible: false,
        type: "typhoon_geom_layer"
    })
    typhoonLayer.setZIndex(20);
    return typhoonLayer
}

function getBoundaryLayer() {
    let baseMapOverlay = new ImageLayer({
        source: new ImageWMS({
            url: "http://dev.spaceware.kr/geoserver/etri_4d/wms",
            params: {
                'LAYERS': "etri_4d:SHP_WCDTL",
                'STYLES' : "etri_4d_world_overlay"
            },
            crossOrigin: 'anonymous',
        }),
        visible: false,
        type:"typhoon_boundary_layer",
    })
    baseMapOverlay.setZIndex(15);
    return baseMapOverlay;
}

function getAllLayers(){
    let layers = []
    layers = [getEmptyLayer(), getOSMLayer(), getVWorldSatLayer(), getTyphoonLayer(), getBoundaryLayer()]
    return layers
}

export {getAllLayers}