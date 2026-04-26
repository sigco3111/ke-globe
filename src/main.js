import { nuclearTests, COUNTRY_COLORS, COUNTRY_NAMES } from './nuclearData.js'
import Globe from 'globe.gl'

// ── Globe.gl 초기화
const globe = Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  (document.getElementById('globeViz'))

// ── 초기 카메라: 지구 전체 보이도록
const ggl = globe.globe()
ggl.camera.fov = 25
ggl.camera.near = 0.1
globe.pointOfView({ lat: 20, lng: 0, altitude: 3.5 })

// ── 전역 상태
let currentYear = 1945
let isPlaying   = false
let playTimer   = null
const MIN_YEAR = 1945
const MAX_YEAR = 2024

// ── DOM 레퍼런스
const yearSlider   = document.getElementById('yearSlider')
const yearLabel    = document.getElementById('yearLabel')
const playBtn      = document.getElementById('playBtn')
const totalCount   = document.getElementById('total-count')
const visibleCount = document.getElementById('visible-count')
const detail       = document.getElementById('detail')
const detailClose  = document.getElementById('detail-close')

totalCount.textContent = nuclearTests.length

// ── 점 크기: 폭발력 √ 비례 (3px ~ 50px)
function pointSize(yieldKt) {
  return Math.max(3, Math.min(50, Math.sqrt(yieldKt) * 3.0))
}

// ── Globe.gl Points layer
const pointsData = nuclearTests.map(test => ({
  lat: test.lat,
  lng: test.lon,
  name: test.name,
  year: test.year,
  size: pointSize(test.yield_kt),
  color: COUNTRY_COLORS[test.country] || '#bdc3c7',
  borderColor: '#ffffff',
  borderAltitude: 0.3,
  country: test.country,
  type: test.type,
  location: test.location,
  yield_kt: test.yield_kt,
  desc: test.desc,
}))

// Points layer — 처음엔 전부 숨김 후 연도별로 show
globe.pointsData(pointsData)
  .pointLatitude('lat')
  .pointLongitude('lng')
  .pointRadius('size')
  .pointColor('color')
  .pointBorderColor('borderColor')
  .pointBorderWidth(0.8)
  .pointAltitude(0.02)
  .pointLabel(d => `
    <div style="font-family:sans-serif;font-size:12px;color:#ddd;background:rgba(10,10,15,0.9);padding:8px 12px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);max-width:200px">
      <b style="color:#f5c842">${d.name}</b><br/>
      <span style="color:#999">${d.year} · ${COUNTRY_NAMES[d.country] || d.country}</span><br/>
      <span style="color:#bbb">${d.location}</span><br/>
      <span style="color:#aaa">${d.yield_kt >= 1000 ? (d.yield_kt/1000).toFixed(1) + ' Mt' : d.yield_kt + ' kt'}</span>
    </div>
  `)
  .onPointClick(d => showDetail(d))

// 처음엔 전부 숨김
globe.pointsData([])

// ── 연도 기준 가시성 업데이트
function updateVisibility(year) {
  const visible = pointsData.filter(d => d.year <= year)
  globe.pointsData(visible)
  visibleCount.textContent = visible.length
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
        clearInterval(playTimer)
        isPlaying = false
        playBtn.textContent = '▶ 자동 재생'
        return
      }
      currentYear++
      yearSlider.value = currentYear
      yearLabel.textContent = currentYear
      updateVisibility(currentYear)
    }, 280)
  } else {
    playBtn.textContent = '▶ 자동 재생'
    clearInterval(playTimer)
  }
})

// ── 상세 패널
function showDetail(d) {
  const badgeHTML = d.type === 'H'
    ? '<span class="type-badge type-h">수소핵</span>'
    : '<span class="type-badge type-a">원자핵</span>'

  document.getElementById('d-name').textContent     = d.name
  document.getElementById('d-badge').innerHTML      = badgeHTML
  document.getElementById('d-year').textContent     = `${d.year}년`
  document.getElementById('d-country').textContent  = COUNTRY_NAMES[d.country] || d.country
  document.getElementById('d-location').textContent = d.location
  document.getElementById('d-yield').textContent    = d.yield_kt >= 1000
    ? `${(d.yield_kt / 1000).toFixed(1)} MT (${d.yield_kt.toLocaleString()} kt)`
    : `${d.yield_kt} kt`
  document.getElementById('d-type').textContent     = d.type === 'H' ? '수소핵' : '원자핵'
  document.getElementById('d-desc').textContent     = d.desc || ''
  detail.classList.add('visible')
}

detailClose.addEventListener('click', () => detail.classList.remove('visible'))

// ── 초기화
updateVisibility(1945)
yearSlider.value  = 1945
yearLabel.textContent = '1945'