# KE-GLOBE — 전 세계 핵실험 타임라인

> 1945~현재까지 전 세계 핵실험 위치를 3D globe에서 시간순으로 재생합니다.

[🌐 Live Demo (Vercel)](https://ke-globe.vercel.app)

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 🔴 3D Globe | CesiumJS 기반.地球 전체를 실시간 조망 |
| ▶️ 자동 재생 | 연도 슬라이더 + 자동 재생으로 핵실험 역사 타임라인 탐색 |
| 🔍 실험 클릭 | 실험명, 폭발력, 핵종류, 역사적 맥락 확인 |
| 🎨 국가별 색상 | 미국/러시아/영국/프랑스/중국/인도/파키스탄/북한 구분 |
| 📍 점 크기 | 폭발력(kiloton)에 비례한 포인트 크기 |
| 🗺️ CTBTO 기반 | CTBTO (Comprehensive Nuclear-Test-Ban Treaty Organization) 공개 데이터를 활용 |

## 기술 스택

- **CesiumJS** — 3D Globe & Map
- **Vite** — Build Tool

## 로컬 실행

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 빌드

```bash
npm run build
npm run preview
```

## 데이터 출처

핵실험 위치 및 정보는 CTBTO (호주 비엔나) 공개 데이터를 참고하여 정리했습니다.
실제 좌표는 보안상의 이유로 대략적인 값일 수 있습니다.

## 라이선스

MIT