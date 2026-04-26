import { nuclearTests, COUNTRY_COLORS, COUNTRY_NAMES } from './nuclearData.js'
import Globe from 'globe.gl'

// ── globeDiv 참조
const globeContainer = document.getElementById('globeViz')

// ── globe 인스턴스 — globeDiv mount 전 초기화
const globe = Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  (globeContainer)

// ── 전역 상태
let currentYear = 1945
let isPlaying = false
let playTimer = null
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

// ── 점 크기: 폭발력 √ 비례
function pointSize(yieldKt) {
  return Math.max(4, Math.min(60, Math.sqrt(yieldKt) * 3.2))
}

// ── 전체 데이터에 isVisible 플래그 추가
const allPoints = nuclearTests.map(test => ({
  lat:     test.lat,
  lng:     test.lon,
  name:    test.name,
  year:    test.year,
  size:    pointSize(test.yield_kt),
  color:   COUNTRY_COLORS[test.country] || '#bdc3c7',
  borderColor: '#ffffff',
  country: test.country,
  type:    test.type,
  location: test.location,
  yield_kt: test.yield_kt,
  desc:    test.desc,
  isVisible: false,
}))

// ── 처음에는 빈 배열로 시작
let visiblePoints = []

// ── Points layer 설정
// pointRadius/pointColor에 함수 직접 전달 (accessor string 대신)
// Globe.gl의 내부 react를 이용해 year 비교로 포인트 표시/숨김
globe
  .pointsData(visiblePoints)
  .pointLat(d => d.lat)
  .pointLng(d => d.lng)
  .pointRadius(d => {
    // isVisible이 false이면 크기 0
    return d.isVisible ? d.size : 0
  })
  .pointColor(d => {
    // isVisible이 false이면 투명
    return d.isVisible ? d.color : 'rgba(0,0,0,0)'
  })
  .pointBorderWidth(0.8)
  .pointBorderColor('#ffffff')
  .pointAltitude(0.02)
  .pointLabel(d => {
    if (!d.isVisible) return ''
    return `<div style="font-family:sans-serif;font-size:12px;color:#ddd;background:rgba(10,10,15,0.92);padding:8px 12px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);max-width:200px;line-height:1.5">
  <b style="color:#f5c842">${d.name}</b><br/>
  <span style="color:#999">${d.year} · ${COUNTRY_NAMES[d.country] || d.country}</span><br/>
  <span style="color:#bbb">${d.location}</span><br/>
  <span style="color:#aaa">${d.yield_kt >= 1000 ? (d.yield_kt/1000).toFixed(1) + ' Mt' : d.yield_kt + ' kt'}</span>
</div>`
  })
  .onPointClick(d => { if (d.isVisible) showDetail(d) })

// ── 점 크기 0 처리: globe.gl가 0 radius를 0으로 그리지 않는 문제 대응
// → 대신 모든 데이터 유지 + radius/color를 0/null로 전환
// 실제 갱신은 pointsData 배열 자체를 교체하지 않고, 각 객체의 isVisible만 토글
// (globe.gl의 pointsData는 reactive — 객체 레퍼런스 동일하면 감지 못함)
// 따라서 매번 새 배열 생성

function updateVisibility(year) {
  // 매번 새 배열 (레퍼런스 변경으로 globe.gl react 트리거)
  visiblePoints = allPoints.map(p => ({
    ...p,
    isVisible: p.year <= year,
  }))
  globe.pointsData(visiblePoints)
  visibleCount.textContent = visiblePoints.filter(p => p.isVisible).length
}

// ── 슬라이더 조작
yearSlider.addEventListener('input', e => {
  currentYear = parseInt(e.target.value, 10)
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

// ── 초기화: 약간의 지연 후 실행 (globe 로딩 대기)
setTimeout(() => {
  updateVisibility(1945)
  yearSlider.value = 1945
  yearLabel.textContent = '1945'
}, 500)