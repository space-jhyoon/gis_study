import {boundary, flooding, tashu, typhoon, wildfire} from "@/assets/js/nameConfig.js";

let key = {};
key.vWorld = "DE8BFA7D-C1C0-3D51-A553-AF8AAC26DA69";
key.safeMap = "37SRABF2-37SR-37SR-37SR-37SRABF2OC";
key.tashu = "925q012i15n567di";

let url = {};
url.vworldLayer = "http://api.vworld.kr/req/wmts/1.0.0/" + key.vWorld + "/Base/{z}/{y}/{x}.png";
url.vWorldSat = "http://api.vworld.kr/req/wmts/1.0.0/" + key.vWorld + "/Satellite/{z}/{y}/{x}.jpeg";
url.typhoon = "http://dev.spaceware.kr/geoserver/etri_sat/wms";
url.boundary = "http://dev.spaceware.kr/geoserver/etri_4d/wms";
url.safeMap = "https://geo.safemap.go.kr/geoserver/safemap/wms";
url.tashu = "https://bikeapp.tashu.or.kr:50041/v1/openapi/station";

let typhoonInfo = {};
typhoonInfo.url = url.typhoon
typhoonInfo.LAYERS = "etri_sat:typhoon_polygon";
typhoonInfo.VIEWPARAMS = `typ_num:2306;agency:"RKSL";`
typhoonInfo.STYLES = "";
typhoonInfo.type = typhoon;
typhoonInfo.zIndex = 15;

let boundaryInfo = {};
boundaryInfo.url = url.boundary
boundaryInfo.LAYERS = "etri_4d:SHP_WCDTL"
boundaryInfo.VIEWPARAMS = "";
boundaryInfo.STYLES = "etri_4d_world_overlay"
boundaryInfo.type = boundary;
boundaryInfo.zIndex = 20;

let wildfireInfo = {};
// wildfireInfo.url = url.safeMap+"/getLayerData.do?apikey="+key.safeMap
wildfireInfo.url = url.safeMap
wildfireInfo.key = key.safeMap
wildfireInfo.LAYERS = "A2SM_FRFIRESTTUS"
wildfireInfo.STYLES = "A2SM_FrfireSttus"
wildfireInfo.type = wildfire;
wildfireInfo.zIndex = 25;


let floodingInfo = {};
floodingInfo.url = url.safeMap
floodingInfo.key = key.safeMap
floodingInfo.LAYERS = "A2SM_FLUDMARKS"
floodingInfo.STYLES = "A2SM_FludMarks"
floodingInfo.type = flooding;
floodingInfo.zIndex = 25;

let tashuInfo = {};
tashuInfo.url = url.tashu
tashuInfo.key = key.tashu
// tashuInfo.LAYERS = "A2SM_FLUDMARKS"
// tashuInfo.STYLES = "A2SM_FludMarks"
tashuInfo.type = tashu;
// tashuInfo.zIndex = 25;


// let cctvInfo = {};
// cctvInfo.url = url.vWorld
// cctvInfo.key = key.vWorld
// cctvInfo.DOMAIN = "http://localhost:5173"
// cctvInfo.LAYERS = "lt_p_utiscctv"
// cctvInfo.STYLES = "lt_p_utiscctv"
// cctvInfo.type = "cctv_layer";
// cctvInfo.zIndex = 25;

export {key, url, typhoonInfo, boundaryInfo, wildfireInfo, floodingInfo, tashuInfo}