import './style.css'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { nuclearTests, COUNTRY_COLORS, COUNTRY_NAMES } from './nuclearData.js'

// ── Cesium 토큰 (_PUBLIC_ 전역 사용, Vercel 배포 시 교체 필요)
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NDc4ZTE0My1iMmM2LTQxMjktODQ1Yy1iZjMwMjU3MTdkYzYiLCJpZCI6NTM0ODcsImlhdCI6MTYxODg4OTc2OX0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk'

// ── Cesium 초기화
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  animation: false,
  timeline: false,
  fullscreenButton: false,
  infoBox: false,
  selectionIndicator: false,
  skyBox: new Cesium.SkyBox({ sources: { positiveX: '', negativeX: '', positiveY: '', negativeY: '', positiveZ: '', negativeZ: '' } }),
  skyAtmosphere: new Cesium.SkyAtmosphere(),
  requestRenderMode: true,
  maximumRenderTimeChange: Infinity,
})

// 어두운 우주 배경
viewer.scene.globe.enableLighting = false
viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#0a0a0f')

// ── 전역 상태
let currentYear = 1945
let isPlaying = false
let playTimer = null
const MIN_YEAR = 1945
const MAX_YEAR = 2024

// ── DOM 레퍼런스
const yearSlider  = document.getElementById('yearSlider')
const yearLabel   = document.getElementById('yearLabel')
const playBtn     = document.getElementById('playBtn')
const totalCount  = document.getElementById('total-count')
const visibleCount= document.getElementById('visible-count')
const detail      = document.getElementById('detail')
const detailClose = document.getElementById('detail-close')

// ── 모든 실험 엔티티를 미리 생성 (가시성 조절만 함)
const entityMap = {}
const allEntities = []

nuclearTests.forEach(test => {
  const color = COUNTRY_COLORS[test.country] || Cesium.Color.GRAY
  const size  = Math.max(4, Math.min(60, Math.sqrt(test.yield_kt) * 3.5))

  const entity = viewer.entities.add({
    id: `nuke-${test.id}`,
    position: Cesium.Cartesian3.fromDegrees(test.lon, test.lat, 0),
    point: {
      pixelSize: size,
      color: color,
      outlineColor: Cesium.Color.WHITE.withAlpha(0.5),
      outlineWidth: 1,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
    label: {
      text: test.year.toString(),
      font: 'bold 11px sans-serif',
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(0, -size / 2 - 6),
      showBackground: true,
      backgroundColor: new Cesium.Color(0, 0, 0, 0.6),
      show: false,  // 처음엔 숨김
    },
    data: test,
  })

  entityMap[test.id] = entity
  allEntities.push(entity)
})

totalCount.textContent = nuclearTests.length

// ── 연도 기준 가시성 업데이트
function updateVisibility(year) {
  let count = 0
  nuclearTests.forEach(test => {
    const entity = entityMap[test.id]
    if (test.year <= year) {
      entity.point.show = true
      entity.label.show = year >= 1960  // 1960년 이후만 연도 라벨 표시
      count++
    } else {
      entity.point.show = false
      entity.label.show = false
    }
  })
  visibleCount.textContent = count
}

// ── 슬라이더 조작
yearSlider.addEventListener('input', e => {
  currentYear = parseInt(e.target.value)
  yearLabel.textContent = currentYear
  updateVisibility(currentYear)
})

// ── 자동 재생
playBtn.addEventListener('click', () => {
  isPlaying = !isPlaying
  if (isPlaying) {
    playBtn.textContent = '⏸ 일시정지'
    if (currentYear >= MAX_YEAR) {
      currentYear = MIN_YEAR
      yearSlider.value = MIN_YEAR
      yearLabel.textContent = MIN_YEAR
    }
    playTimer = setInterval(() => {
      if (currentYear >= MAX_YEAR) {
        currentYear = MIN_YEAR
      } else {
        currentYear++
      }
      yearSlider.value = currentYear
      yearLabel.textContent = currentYear
      updateVisibility(currentYear)
    }, 280)
  } else {
    playBtn.textContent = '▶ 자동 재생'
    clearInterval(playTimer)
  }
})

// ── 클릭 → 상세 패널
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
handler.setInputAction(click => {
  const picked = viewer.scene.pick(click.position)
  if (Cesium.defined(picked) && picked.id && picked.id.data) {
    showDetail(picked.id.data)
  } else {
    detail.classList.remove('visible')
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)

function showDetail(test) {
  const badgeHTML = test.type === 'H'
    ? '<span class="type-badge type-h">수소핵</span>'
    : '<span class="type-badge type-a">원자핵</span>'

  document.getElementById('d-name').textContent     = test.name
  document.getElementById('d-badge').innerHTML      = badgeHTML
  document.getElementById('d-year').textContent     = `${test.year}년`
  document.getElementById('d-country').textContent  = COUNTRY_NAMES[test.country] || test.country
  document.getElementById('d-location').textContent = test.location
  document.getElementById('d-yield').textContent    = test.yield_kt >= 1000
    ? `${(test.yield_kt/1000).toFixed(1)} MT (${test.yield_kt.toLocaleString()} kt)`
    : `${test.yield_kt} kt`
  document.getElementById('d-type').textContent     = test.type === 'H' ? '수소핵' : '원자핵'
  document.getElementById('d-desc').textContent     = test.desc || ''
  detail.classList.add('visible')
}

detailClose.addEventListener('click', () => detail.classList.remove('visible'))

// ── 초기화
updateVisibility(1945)
yearSlider.value = 1945
yearLabel.textContent = '1945'