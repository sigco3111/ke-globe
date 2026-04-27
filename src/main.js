import { nuclearTests, COUNTRY_COLORS, COUNTRY_NAMES } from './nuclearData.js'
import Globe from 'globe.gl'
import * as THREE from 'three'

const yearSlider = document.getElementById('yearSlider')
const yearLabel = document.getElementById('yearLabel')
const playBtn = document.getElementById('playBtn')
const totalCount = document.getElementById('total-count')
const visibleCount = document.getElementById('visible-count')
const detail = document.getElementById('detail')
const detailClose = document.getElementById('detail-close')

let currentYear = 1945
let isPlaying = false
let playTimer = null
const MIN_YEAR = 1945
const MAX_YEAR = 2024

totalCount.textContent = nuclearTests.length

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 216, 66'
}

function pointSize(y) {
  return Math.max(0.3, Math.min(1.5, Math.sqrt(y) / 15))
}

const allPoints = nuclearTests.map(test => ({
  lat: test.lat,
  lng: test.lon,
  size: pointSize(test.yield_kt),
  color: COUNTRY_COLORS[test.country] || '#bdc3c7',
  name: test.name,
  year: test.year,
  country: test.country,
  type: test.type,
  location: test.location,
  yield_kt: test.yield_kt,
  desc: test.desc,
  visible: false,
}))

let currentVisiblePts = []
let currentRingsData = []
let globeRef = null
let timeRef = 0
let animFrame = null

function updatePoints(year) {
  allPoints.forEach(p => { p.visible = p.year <= year })
  currentVisiblePts = allPoints
    .filter(p => p.visible)
    .map(p => ({ ...p, size: p.size, color: p.color }))

  const locationGroups = {}
  currentVisiblePts.forEach((p) => {
    const key = `${p.lat.toFixed(3)}_${p.lng.toFixed(3)}`
    if (!locationGroups[key]) {
      locationGroups[key] = []
    }
    locationGroups[key].push({ ...p, stackIndex: locationGroups[key].length })
  })

  currentRingsData = []
  Object.values(locationGroups).forEach(group => {
    group.forEach((p) => {
      const baseSize = p.size * 0.8
      currentRingsData.push({
        lat: p.lat,
        lng: p.lng,
        size: baseSize,
        color: p.color,
        name: p.name,
        year: p.year,
        country: p.country,
        location: p.location,
        yield_kt: p.yield_kt,
        desc: p.desc,
        type: p.type,
        visible: p.visible,
        altitude: 0.02 + p.stackIndex * 0.01,
        ringIndex: p.stackIndex,
        isMainRing: true,
      })
    })
  })

  if (globeRef) {
    globeRef.pointsData([...currentVisiblePts])
    globeRef.ringsData([...currentRingsData])
  }
  visibleCount.textContent = currentVisiblePts.length
}

function showDetail(d) {
  const badgeHTML = d.type === 'H'
    ? '<span class="type-badge type-h">수소핵</span>'
    : '<span class="type-badge type-a">원자핵</span>'
  document.getElementById('d-name').textContent = d.name
  document.getElementById('d-badge').innerHTML = badgeHTML
  document.getElementById('d-year').textContent = `${d.year}년`
  document.getElementById('d-country').textContent = COUNTRY_NAMES[d.country] || d.country
  document.getElementById('d-location').textContent = d.location
  document.getElementById('d-yield').textContent = d.yield_kt >= 1000
    ? `${(d.yield_kt / 1000).toFixed(1)} MT`
    : `${d.yield_kt} kt`
  document.getElementById('d-type').textContent = d.type === 'H' ? '수소핵' : '원자핵'
  document.getElementById('d-desc').textContent = d.desc || ''
  detail.classList.add('visible')
}

detailClose.addEventListener('click', () => detail.classList.remove('visible'))

yearSlider.addEventListener('input', () => {
  currentYear = parseInt(yearSlider.value, 10)
  yearLabel.textContent = currentYear
  updatePoints(currentYear)
})

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

const container = document.getElementById('globeViz')

try {
  const globe = Globe()
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
    .showAtmosphere(true)
    .atmosphereColor('#00d4ff')
    .atmosphereAltitude(0.2)
    .pointsData([])
    .pointLat('lat')
    .pointLng('lng')
    .pointRadius(d => Math.max(0.1, d.size * 0.3))
    .pointColor('color')
    .pointAltitude(d => d.altitude || 0.01)
    .pointLabel(d => {
      if (!d.visible) return ''
      return `<div style="font-family:sans-serif;font-size:13px;color:#fff;background:rgba(15,25,45,0.95);padding:10px 14px;border-radius:8px;max-width:220px;line-height:1.6;border:1px solid rgba(79,164,212,0.4);box-shadow:0 4px 20px rgba(0,0,0,0.5)">
      <b style="color:#ffd842;font-size:14px">${d.name}</b><br/>
      <span style="color:#aaa">${d.year} · ${COUNTRY_NAMES[d.country] || d.country}</span><br/>
      <span style="color:#ccc">📍 ${d.location}</span><br/>
      <span style="color:#4fa4d4">💥 ${d.yield_kt >= 1000 ? (d.yield_kt/1000).toFixed(1) + ' Mt' : d.yield_kt + ' kt'}</span>
    </div>`
    })
    .onPointClick(d => { if (d.visible && !d.ringIndex) showDetail(d) })
    .ringsData([])
    .ringColor(d => t => {
      const r = Math.max(0, Math.min(1, 2 * (1 - t)))
      const alpha = d.isMainRing ? 0.6 : 0.3
      const color = d.color || '#ffd842'
      return `rgba(${hexToRgb(color)}, ${r * alpha})`
    })
    .ringMaxRadius(1.5)
    .ringPropagationSpeed(2)
    .ringRepeatPeriod(2.5)
    .onGlobeReady(() => {
      globeRef = globe

      const scene = globe.scene()

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
      ambientLight.name = 'ambientLight'
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
      directionalLight.position.set(5, 3, 5)
      directionalLight.name = 'directionalLight'
      scene.add(directionalLight)

      const backLight = new THREE.DirectionalLight(0xffffff, 1.0)
      backLight.position.set(-5, -3, -5)
      backLight.name = 'backLight'
      scene.add(backLight)

      const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
            gl_FragColor = vec4(0.0, 0.83, 1.0, 0.9) * intensity;
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      })

      const atmosphereGeometry = new THREE.SphereGeometry(1.15, 64, 64)
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
      atmosphere.name = 'customAtmosphere'
      scene.add(atmosphere)

      const innerGlowMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.45 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            gl_FragColor = vec4(0.0, 0.55, 0.9, 0.4) * intensity;
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
        transparent: true,
      })

      const innerGlowGeometry = new THREE.SphereGeometry(1.02, 64, 64)
      const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial)
      innerGlow.name = 'customInnerGlow'
      scene.add(innerGlow)

      const animate = () => {
        timeRef += 0.015
        if (globeRef && currentRingsData.length > 0) {
          globeRef.ringsData(
            currentRingsData.map(r => ({
              ...r,
              altitude: (r.altitude || 0.01) + 0.005 * Math.sin(timeRef * 2 + r.lat * 0.1 + r.ringIndex * 0.5),
            }))
          )
          const totalYield = currentVisiblePts.reduce((sum, p) => sum + p.yield_kt, 0)
          const targetAlt = 0.15 + Math.min(0.25, totalYield / 30000)
          globeRef.atmosphereAltitude(targetAlt + 0.03 * Math.sin(timeRef * 0.5))
        }
        animFrame = requestAnimationFrame(animate)
      }
      animFrame = requestAnimationFrame(animate)

      currentYear = 1945
      yearSlider.value = 1945
      yearLabel.textContent = '1945'
      setTimeout(() => updatePoints(1945), 500)
    })
  globe(container)
} catch(e) {
  console.error('Globe initialization error:', e)
}

setTimeout(() => {
  const w = container.offsetWidth
  const h = container.offsetHeight
  if (w > 0 && h > 0) {
    globe.width(w).height(h)
  }
}, 300)

const observeSize = () => {
  const w = container.offsetWidth
  const h = container.offsetHeight
  if (w > 0 && h > 0 && globe._opts) {
    globe.width(w).height(h)
  }
}
observeSize()
window.addEventListener('resize', observeSize)

setTimeout(() => {
  if (!globeRef) {
    globeRef = globe
    updatePoints(1945)
    yearSlider.value = 1945
    yearLabel.textContent = '1945'
  }
}, 2000)