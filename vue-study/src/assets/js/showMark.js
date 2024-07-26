import {Feature} from "ol";
import {Point} from "ol/geom";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import VectorLayer from "ol/layer/Vector";
import markerImage from '@/assets/image/marker.png'
import {crtPstMark} from "@/assets/js/nameConfig.js";

function showMark(map, lonlat){
    removeMarkLayer(map)
    let markLayer = createMark(lonlat);
    map.addLayer(markLayer)
}

function removeMarkLayer(map){
    let targetLayer = map.getLayers().getArray().find(layer => layer.get('name') === crtPstMark);
    map.removeLayer(targetLayer);
}

function createMark(lonlat){
    let feature = new Feature({
        geometry: new Point(lonlat),
    })
    let vectorSource = new VectorSource();
    vectorSource.addFeature(feature);

    let markerStyle =  new Style({
        image: new Icon({
            opacity: 1, // 투명도 1=100%
            scale: 0.1, // 크기 1=100%
            src: markerImage,
            anchor: [0.5, 0.9],
        }),
    })
    let layer;
    layer = new VectorLayer({
        source: vectorSource,
        visible: true,
        name: crtPstMark,
        style: markerStyle,
        zIndex: 100
    });
    return layer;
}

export {showMark, removeMarkLayer, createMark}