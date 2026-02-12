<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container"></div>

    <div class="info-box">
      <div class="info-item">Zoom: <span>{{ zoomLevel }}</span></div>
      <div class="info-item" v-if="showPolygon">Layer: <span>{{ layerName }}</span></div>
      <div class="info-item" v-if="showPoints">Points: <span>10,000 (WebGL)</span></div>
    </div>

    <div class="floating-controls">
      <button @click="switchProjection" class="float-btn">
        🌐 투영법: {{ currentProj }}
      </button>

      <button @click="togglePolygonLayer" class="float-btn poly-btn" :class="{ active: showPolygon }">
        🗺️ 관심 영역 {{ showPolygon ? '숨기기' : '보기' }}
      </button>

      <button @click="toggleWebGLPoints" class="float-btn point-btn" :class="{ active: showPoints }">
        ✨ 대전 1만개 점 {{ showPoints ? '제거' : '생성' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import WebGLPointsLayer from 'ol/layer/WebGLPoints';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { Style, Fill, Stroke, Text } from 'ol/style';
import Feature from 'ol/Feature';
import { Polygon, Point } from 'ol/geom';
import { fromLonLat, transform } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';

// 1. 좌표계 정의 (EPSG:5181)
proj4.defs("EPSG:5181", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
register(proj4);

const mapContainer = ref(null);
const zoomLevel = ref(6.5);
const layerName = ref('한반도');
const currentProj = ref('EPSG:3857');
const showPoints = ref(false);
const showPolygon = ref(true); // 폴리곤 레이어 초기값 true

let mapInstance = null;
let polygonLayer = null;
let webglLayer = null;

/**
 * 줌 레벨에 따라 폴리곤을 업데이트하는 함수
 */
const updatePolygonByZoom = () => {
  if (!mapInstance || !polygonLayer || !showPolygon.value) return;

  const zoom = mapInstance.getView().getZoom();
  zoomLevel.value = zoom.toFixed(1);

  const source = polygonLayer.getSource();
  source.clear();

  let color, label, coords;

  // 요청하신 줌 레벨 기준 적용
  if (zoom >= 12.5) {
    layerName.value = '종로구';
    color = 'rgba(0, 123, 255, 0.5)';
    label = '종로구';
    coords = [[126.96, 37.57], [127.00, 37.57], [127.00, 37.60], [126.96, 37.60], [126.96, 37.57]];
  } else if (zoom >= 8) {
    layerName.value = '서울';
    color = 'rgba(40, 167, 69, 0.5)';
    label = '서울';
    coords = [[126.8, 37.45], [127.2, 37.45], [127.2, 37.65], [126.8, 37.65], [126.8, 37.45]];
  } else {
    layerName.value = '한반도';
    color = 'rgba(220, 53, 69, 0.4)';
    label = '한반도';
    coords = [[124, 33], [132, 33], [132, 43], [124, 43], [124, 33]];
  }

  const transformedCoords = coords.map(coord => fromLonLat(coord, currentProj.value));
  const feature = new Feature({ geometry: new Polygon([transformedCoords]) });
  feature.setStyle(new Style({
    fill: new Fill({ color: color }),
    stroke: new Stroke({ color: '#fff', width: 2 }),
    text: new Text({
      text: label, font: 'bold 18px sans-serif',
      fill: new Fill({ color: '#fff' }), stroke: new Stroke({ color: '#000', width: 3 })
    })
  }));
  source.addFeature(feature);
};

/**
 * 폴리곤 레이어 토글 함수
 */
const togglePolygonLayer = () => {
  showPolygon.value = !showPolygon.value;
  if (showPolygon.value) {
    updatePolygonByZoom();
  } else {
    polygonLayer.getSource().clear();
    layerName.value = "비활성";
  }
};

/**
 * WebGL을 이용한 대전 1만개 점 생성/제거 함수
 */
const toggleWebGLPoints = () => {
  showPoints.value = !showPoints.value;

  if (showPoints.value) {
    const features = [];
    for (let i = 0; i < 10000; i++) {
      const lon = 127.3 + Math.random() * 0.1;
      const lat = 36.3 + Math.random() * 0.1;
      features.push(new Feature({
        geometry: new Point(fromLonLat([lon, lat], currentProj.value))
      }));
    }
    const source = new VectorSource({ features });

    webglLayer = new WebGLPointsLayer({
      source: source,
      style: {
        symbol: {
          symbolType: 'circle',
          size: 10,
          color: '#42b883',
          opacity: 0.7,
        }
      }
    });
    mapInstance.addLayer(webglLayer);

    mapInstance.getView().animate({
      center: fromLonLat([127.3845, 36.3504], currentProj.value),
      zoom: 12,
      duration: 1000
    });
  } else {
    if (webglLayer) {
      mapInstance.removeLayer(webglLayer);
      webglLayer = null;
    }
  }
};

/**
 * 투영법 전환 함수
 */
const switchProjection = () => {
  if (!mapInstance) return;
  const projections = ['EPSG:3857', 'EPSG:4326', 'EPSG:5181'];
  const nextProj = projections[(projections.indexOf(currentProj.value) + 1) % projections.length];

  const view = mapInstance.getView();
  const oldCenter = view.getCenter();
  const oldProj = view.getProjection().getCode();
  const newCenter = transform(oldCenter, oldProj, nextProj);

  const newView = new View({
    projection: nextProj,
    center: newCenter,
    zoom: view.getZoom(),
  });

  mapInstance.setView(newView);
  currentProj.value = nextProj;

  newView.on('change:resolution', () => {
    zoomLevel.value = mapInstance.getView().getZoom().toFixed(1);
    updatePolygonByZoom();
  });

  updatePolygonByZoom();

  if (showPoints.value) {
    // WebGL 레이어는 좌표계 변경 시 재배치 필요
    mapInstance.removeLayer(webglLayer);
    showPoints.value = false;
    toggleWebGLPoints();
  }
};

onMounted(() => {
  polygonLayer = new VectorLayer({ source: new VectorSource(), zIndex: 5 });

  mapInstance = new Map({
    target: mapContainer.value,
    controls: [],
    layers: [new TileLayer({ source: new OSM() }), polygonLayer],
    view: new View({
      projection: currentProj.value,
      center: fromLonLat([127.0, 37.5], currentProj.value),
      zoom: 6.5,
    }),
  });

  mapInstance.getView().on('change:resolution', () => {
    zoomLevel.value = mapInstance.getView().getZoom().toFixed(1);
    updatePolygonByZoom();
  });

  updatePolygonByZoom();
});
</script>

<style>
/* 초기화 */
html, body, #app { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
.map-wrapper { position: relative; width: 100%; height: 100%; background: #1a1a1a; }
.map-container { width: 100%; height: 100%; }

/* 상단 정보 박스 */
.info-box {
  position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
  z-index: 1000; background: rgba(0, 0, 0, 0.8); padding: 10px 30px;
  border-radius: 30px; color: white; display: flex; gap: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5); pointer-events: none;
}
.info-item span { color: #42b883; font-weight: bold; }

/* 좌측 버튼 제어 */
.floating-controls {
  position: absolute; top: 20px; left: 20px; z-index: 1000;
  display: flex; flex-direction: column; gap: 10px;
}
.float-btn {
  padding: 12px 18px; background: #35495e; color: white; border: none;
  border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s;
  text-align: left;
}
.float-btn:hover { background: #42b883; }

/* 활성화 상태 색상 */
.poly-btn.active { background: #3498db; }
.point-btn.active { background: #e74c3c; }
</style>