import { nuclearTests, COUNTRY_COLORS, COUNTRY_NAMES } from './nuclearData.js'
import Globe from 'globe.gl'

// ── DOM 레퍼런스 (script 로드 시점에 확보)
const yearSlider   = document.getElementById('yearSlider')
const yearLabel    = document.getElementById('yearLabel')
const playBtn      = document.getElementById('playBtn')
const totalCount   = document.getElementById('total-count')
const visibleCount = document.getElementById('visible-count')
const detail       = document.getElementById('detail')
const detailClose  = document.getElementById('detail-close')

// ── 상태
let currentYear = 1945
let isPlaying   = false
let playTimer   = null
const MIN_YEAR  = 1945
const MAX_YEAR  = 2024

totalCount.textContent = nuclearTests.length

// ── 점 크기
function pointSize(y) { return Math.max(4, Math.min(60, Math.sqrt(y) * 3.2)) }

// ── 전체 데이터 — lat/lng/size/color 표준 필드명 사용
const allPoints = nuclearTests.map(test => ({
  lat:    test.lat,
  lng:    test.lon,
  size:   pointSize(test.yield_kt),
  color:  COUNTRY_COLORS[test.country] || '#bdc3c7',
  // 커스텀
  name:     test.name,
  year:     test.year,
  country:  test.country,
  type:     test.type,
  location: test.location,
  yield_kt: test.yield_kt,
  desc:     test.desc,
  visible:  false,
}))

// ── 가시성 업데이트
let currentVisiblePts = []
let globeRef = null  // will hold globe instance

function updatePoints(year) {
  allPoints.forEach(p => { p.visible = p.year <= year })
  currentVisiblePts = allPoints
    .filter(p => p.visible)
    .map(p => ({ ...p, size: p.size, color: p.color }))

  if (globeRef) {
    // 레퍼런스 변경으로 globe.gl 트리거
    globeRef.pointsData([...currentVisiblePts])
  }
  visibleCount.textContent = currentVisiblePts.length
}

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
    ? `${(d.yield_kt / 1000).toFixed(1)} MT`
    : `${d.yield_kt} kt`
  document.getElementById('d-type').textContent     = d.type === 'H' ? '수소핵' : '원자핵'
  document.getElementById('d-desc').textContent     = d.desc || ''
  detail.classList.add('visible')
}

detailClose.addEventListener('click', () => detail.classList.remove('visible'))

// ── Slider event
yearSlider.addEventListener('input', () => {
  currentYear = parseInt(yearSlider.value, 10)
  yearLabel.textContent = currentYear
  updatePoints(currentYear)
})

// ── Play button
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
      updatePoints(currentYear)
    }, 280)
  } else {
    playBtn.textContent = '▶ 자동 재생'
    clearInterval(playTimer)
  }
})

// ── Globe.gl 초기화 — onGlobeReady 안에서 slider 리스너 재등록 & 초기 데이터 로드
const globe = Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .pointsData([])
  .pointLat('lat')
  .pointLng('lng')
  .pointRadius('size')
  .pointColor('color')
  .pointBorderWidth(0.8)
  .pointBorderColor('#ffffff')
  .pointAltitude(0.02)
  .pointLabel(d => {
    if (!d.visible) return ''
    return `<div style="font-family:sans-serif;font-size:12px;color:#ddd;background:rgba(10,10,15,0.92);padding:8px 12px;border-radius:6px;max-width:200px;line-height:1.5">
  <b style="color:#f5c842">${d.name}</b><br/>
  <span style="color:#999">${d.year} · ${COUNTRY_NAMES[d.country] || d.country}</span><br/>
  <span style="color:#bbb">${d.location}</span><br/>
  <span style="color:#aaa">${d.yield_kt >= 1000 ? (d.yield_kt/1000).toFixed(1) + ' Mt' : d.yield_kt + ' kt'}</span>
</div>`
  })
  .onPointClick(d => { if (d.visible) showDetail(d) })
  .onGlobeReady(() => {
    // Globe 로딩 완료 후 slider 초기값 세팅 & 첫 렌더링
    globeRef = globe
    currentYear = 1945
    yearSlider.value = 1945
    yearLabel.textContent = '1945'
    updatePoints(1945)
  })
  (document.getElementById('globeViz'))

// ── Fallback: globeReady 안 불렸을 경우 (2초 후)
setTimeout(() => {
  if (!globeRef) {
    globeRef = globe
    updatePoints(1945)
    yearSlider.value = 1945
    yearLabel.textContent = '1945'
  }
}, 2000)