let key = {};
key.vWorld = "ADF647B7-C03B-3445-AFE7-1FC99687F8F6";
key.safeMap = "37SRABF2-37SR-37SR-37SR-37SRABF2OC";

let url = {};
url.vWorldSat = "http://api.vworld.kr/req/wmts/1.0.0/" + key.vWorld + "/Satellite/{z}/{y}/{x}.jpeg";
url.typhoon = "http://dev.spaceware.kr/geoserver/etri_sat/wms";
url.boundary = "http://dev.spaceware.kr/geoserver/etri_4d/wms";
url.safeMap = "https://geo.safemap.go.kr/geoserver/safemap/wms";

let typhoonInfo = {};
typhoonInfo.url = url.typhoon
typhoonInfo.LAYERS = "etri_sat:typhoon_polygon";
typhoonInfo.VIEWPARAMS = `typ_num:2306;agency:"RKSL";`
typhoonInfo.STYLES = "";
typhoonInfo.type = "typhoon_geom_layer";
typhoonInfo.zIndex = 15;

let boundaryInfo = {};
boundaryInfo.url = url.boundary
boundaryInfo.LAYERS = "etri_4d:SHP_WCDTL"
boundaryInfo.VIEWPARAMS = "";
boundaryInfo.STYLES = "etri_4d_world_overlay"
boundaryInfo.type = "typhoon_boundary_layer";
boundaryInfo.zIndex = 20;

let wildfireInfo = {};
wildfireInfo.url = url.safeMap
wildfireInfo.key = key.safeMap
wildfireInfo.LAYERS = "A2SM_FRFIRESTTUS"
wildfireInfo.STYLES = "A2SM_FrfireSttus"
wildfireInfo.type = "wildfire_layer";
wildfireInfo.zIndex = 25;

let floodingInfo = {};
floodingInfo.url = url.safeMap
floodingInfo.key = key.safeMap
floodingInfo.LAYERS = "A2SM_FLUDMARKS"
floodingInfo.STYLES = "A2SM_FludMarks"
floodingInfo.type = "flooding_layer";
floodingInfo.zIndex = 25;

export {key, url, typhoonInfo, boundaryInfo, wildfireInfo, floodingInfo}