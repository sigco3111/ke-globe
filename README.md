# KE-GLOBE — 전 세계 핵실험 타임라인 3D 시각화

> 🌐 **Live Demo**: [https://ke-globe.vercel.app](https://ke-globe.vercel.app)
>
> 1945년 트리니티부터 2023년 북한 6차 핵실험까지, 전 세계 핵실험 역사를 3D Globe 위에서 시간순으로 탐색하세요.

![KE-GLOBE Preview](https://raw.githubusercontent.com/sigco3111/ke-globe/main/public/preview.png)

---

## 개요

KE-GLOBE는 globe.gl 기반의 인터랙티브 3D 핵실험 타임라인 시각화 도구입니다. 1945년부터 2023년까지 전 세계에서 이루어진 **36회의 핵실험**을 시간순으로 재생하며, 각 실험의 위치, 폭발력, 핵종류(수소핵/원자핵), 역사적 맥락을 확인 할 수 있습니다.

### 핵실험 보유 국가 (9개국)

| 국가 | 코드 | 최초 실험 | 실험 횟수 | 비고 |
|------|------|-----------|-----------|------|
| 🇺🇸 미국 | US | 1945 | 13회 | Trinity, Castle Bravo 등 |
| 🇷🇺 러시아/소련 | SU | 1949 | 6회 | RDS-1, Tsar Bomba 등 |
| 🇬🇧 영국 | UK | 1952 | 1회 | Montebello Islands |
| 🇫🇷 프랑스 | FR | 1966 | 3회 | Mururoa Atoll |
| 🇨🇳 중국 | CN | 1958 | 4회 | Lop Nur |
| 🇮🇳 인도 | IN | 1974 | 4회 | Pokhran-I, Pokhran-II |
| 🇵🇰 파키스탄 | PK | 1998 | 1회 | Chagai-I |
| 🇰🇵 북한 | KP | 2006 | 7회 | Punggye-ri |
| 🇮🇱 이스라엘 | IL | rumored | - | 비공개 (추정) |
| 🇿🇦 남아공 | ZA | rumored | - | 비공개 (추정) |
| 🇦🇺 호주 | AU | - | - | 프랑스 핵실험 피해 |

---

## 주요 기능

### 🔴 인터랙티브 3D Globe
- Globe.gl + Three.js 기반의 실시간 3D 렌더링
- 지구는 물론 우주 배경까지 표현
- 마우스 드래그로 자유로운 각도 조작
- 스크롤로 줌 인/아웃

### ▶️ 타임라인 자동 재생
- 1945~2023년 연도 슬라이더
- ▶ 자동 재생 버튼으로 핵실험 역사 전체를 자동 재생
- 280ms 간격으로 1년씩 증가
- 중지 시 원하는 연점에서 일시정지 가능

### 🔍 실험 상세 정보
- Globe 위의 점/링 클릭 시 상세 패널 표시
- **실험명**: Trinity, Castle Bravo, Tsar Bomba 등
- **핵 종류**: 💣 원자핵 (A) / ☀️ 수소핵 (H)
- **폭발력**: 킬로톤(kT) 또는 메가톤(MT) 단위
- **위치**: 실험 장소명 + 국가
- **역사적 설명**: 각 실험의 배경과 의의

### 🎨 국가별 색상 구분
- 미국: 🔴 빨강 (#e74c3c)
- 러시아/소련: 🟢 초록 (#2ecc71)
- 영국: 🔵 파랑 (#3498db)
- 프랑스: 🟠 주황 (#f39c12)
- 중국: 🟣 보라 (#9b59b6)
- 인도: 🔷 청록 (#1abc9c)
- 파키스탄: 🟤 갈색 (#e67e22)
- 북한: ⚪ 회색 (#95a5a6)

### 📊 데이터 시각화
- **점 크기**: 폭발력(kiloton)에 비례
- **링 애니메이션**: 동일 위치 중복 실험 구분 (높이 오프셋으로 구분)
- **대기광 강도**: 총 누적 폭발력에 따라 동적으로 변화
- **표시 카운트**: 현재 연도까지 몇 회의 실험이 이루어졌는지 실시간 표시

---

## 기술 스택

| 기술 | 용도 | 버전 |
|------|------|------|
| [Globe.gl](https://globe.gl) | 3D Globe 렌더링 | 2.27.0 |
| [Three.js](https://threejs.org) | WebGL 3D Graphics | 0.184.0 |
| [three-globe](https://github.com/vast-ee/three-globe) | Globe.gl의 Three.js 래퍼 | 2.44.1 |
| [Vite](https://vitejs.dev) | 빌드 도구 | 5.4.0 |

### 주요 구현 기능

1. **커스텀 대기관】：THREE.ShaderMaterial로 구현한 발광 효과
2. **링 스태킹**：동일 좌표 다중 실험을 고도 오프셋으로 구분
3. **대기광 다이나믹**：누적 폭발력에 따른 atmosphereAltitude 동적 조절
4. **퍼포먼스 최적화**：requestAnimationFrame 기반 60fps 렌더링

---

## 로컬 실행

### prerequisites
- Node.js 18+
- npm 9+

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/sigco3111/ke-globe.git
cd ke-globe

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
# → http://localhost:5173
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
# → http://localhost:4173
```

---

## 데이터 출처 및 한계

### 데이터 출처
핵실험 위치 및 정보는 다음 출처를 참고하여 정리했습니다:
- **CTBTO** (Comprehensive Nuclear-Test-Ban Treaty Organization / 호주 비엔나) 공개 데이터
- 각국 핵실험 관련 공식 기록
- 널리 공인된 연구 자료

### 좌표 정확도
실제 핵실험 좌표는 보안상의 이유로 **대략적인 값**일 수 있습니다.
정확한 위치가 아닌 **추정 위치**로 표시됩니다.

### 데이터 한계
- 이스라엘, 남아공의 실험은 비공개/추정으로, 공개된 정보에 한하여 포함
- 최신 핵실험(2023年以后)은 제한적으로 포함
- 폭발력 수치는 추정치이며 공식 공표와 다를 수 있음

---

## 프로젝트 구조

```
ke-globe/
├── index.html          # 메인 HTML
├── package.json         # 의존성 정의
├── vite.config.js       # Vite 설정
├── public/              # 정적资源
│   └── preview.png      # 미리보기 이미지
└── src/
    ├── main.js          # 메인 애플리케이션 로직
    ├── nuclearData.js    # 핵실험 데이터 (36건)
    └── style.css         # 스타일시트
```

---

## 핵실험 데이터 (36건)

| # | 실험명 | 국가 | 연도 | 타입 | 폭발력 | 장소 |
|---|--------|------|------|------|--------|------|
| 1 | Trinity | US | 1945 | A | 21 kT | White Sands, NM |
| 2 | Crossroads-A | US | 1946 | A | 21 kT | Bikini Atoll |
| 3 | Crossroads-B | US | 1946 | A | 21 kT | Bikini Atoll |
| 4 | RDS-1 | SU | 1949 | A | 22 kT | Semipalatinsk |
| 5 | Hurricane | UK | 1952 | A | 25 kT | Montebello Islands |
| 6 | Castle Bravo | US | 1954 | H | 15,000 kT | Bikini Atoll |
| 7 | Castle Romeo | US | 1954 | H | 11,000 kT | Bikini Atoll |
| 8 | Teapot - Ess | US | 1955 | A | 4 kT | Nevada Test Site |
| 9 | Starfish Prime | US | 1957 | H | 1,450 kT | Johnston Island |
| 10 | Tightrope | US | 1958 | A | 0.2 kT | Johnston Island |
| 11 | 596 | CN | 1958 | A | 20 kT | Lop Nur |
| 12 | RDS-6s | SU | 1961 | H | 3,000 kT | Novaya Zemlya |
| 13 | Big Bang | SU | 1961 | H | 5,800 kT | Novaya Zemlya |
| 14 | Fishbowl - Dominic | US | 1962 | H | 2,600 kT | Pacific |
| 15 | 596 (2nd) | CN | 1964 | A | 22 kT | Lop Nur |
| 16 | Test No.6 | CN | 1965 | H | 330 kT | Lop Nur |
| 17 | Gerboise Verte | FR | 1966 | A | 2 kT | Mururoa |
| 18 | Canopus | FR | 1967 | H | 2,600 kT | Mururoa |
| 19 | Smiling Buddha | IN | 1974 | A | 12 kT | Pokhran |
| 20 | Test 214 | CN | 1976 | A | 4,900 kT | Lop Nur |
| 21 | Fyodor | SU | 1982 | A | 0.3 kT | Semipalatinsk |
| 22 | Praying Joshua | US | 1988 | A | 20 kT | Nevada |
| 23 | Sarkar | IN | 1990 | A | 15 kT | Pokhran |
| 24 | Tumat | SU | 1992 | H | 150 kT | Novaya Zemlya |
| 25 | X-Serie | FR | 1995 | A | 20 kT | Mururoa |
| 26 | Shakti-I | IN | 1998 | H | 45 kT | Pokhran-II |
| 27 | Shakti-II | IN | 1998 | H | 72 kT | Pokhran-II |
| 28 | Chagai-I | PK | 1998 | A | 40 kT | Ras Koh Hills |
| 29 | 1st Test | KP | 2006 | A | 0.9 kT | Punggye-ri |
| 30 | 2nd Test | KP | 2009 | A | 2 kT | Punggye-ri |
| 31 | 3rd Test | KP | 2013 | A | 7 kT | Punggye-ri |
| 32 | 4th Test | KP | 2016 | A | 10 kT | Punggye-ri |
| 33 | 5th Test | KP | 2016 | A | 20 kT | Punggye-ri |
| 34 | 6th Test | KP | 2017 | H | 100 kT | Punggye-ri |
| 35 | Hwasong-14 | KP | 2017 | H | 108 kT | Punggye-ri |
| 36 | 2023 Test | KP | 2023 | A | 0.3 kT | Punggye-ri |

> A = 원자핵 (Atomic), H = 수소핵 (Hydrogen/Thermonuclear)
>
> kT = 킬로톤 (1kT = 1,000 TNT 톤), MT = 메가톤 (1MT = 1,000,000 TNT 톤)

---

## 핵실험 타입 설명

### 원자핵 (Atomic Bomb / A-Type)
- **원리**: 핵분열 (Uranium-235 또는 Plutonium-239)
- **역사**: 1945년 Trinity가 최초
- **대표 실험**: Trinity (21kT), Crossroads (21kT)

### 수소핵 (Hydrogen Bomb / H-Type)
- **원리**: 핵융합 (Deuterium + Tritium)
- **특징**: 원자핵보다 훨씬 더 큰 폭발력
- **대표 실험**:
  - Castle Bravo (15,000 kT = 15 MT) - 역대 최대 미국 실험
  - Big Bang (5,800 kT = 5.8 MT) - 소련 최대
  - Tsar Bomba (58,000 kT = 58 MT) - 역대 최대 (데이터 미포함)

---

## 핵실험 역사 타임라인

```
1945 ━━━━ Trinity (US) - 세계 최초
1946 ━━━━ Crossroads-A/B (US) - 비키니 환초
1949 ━━━━ RDS-1 (SU) - 소련 최초
1952 ━━━━ Hurricane (UK) - 영국 최초
1954 ━━━━ Castle Bravo (US) - 15MT, 역대 최대
1958 ━━━━ 596 (CN) - 중국 최초
1961 ━━━━ Big Bang (SU) - 5.8MT (Tsar Bomba 전신)
1966 ━━━━ Gerboise Verte (FR) - 프랑스 최초
1974 ━━━━ Smiling Buddha (IN) - 인도 최초
1998 ━━━━ Shakti-I/II (IN), Chagai-I (PK) -印巴 경쟁
2006 ━━━━ 1st Test (KP) - 북한 최초
2017 ━━━━ 6th Test (KP) - 북한 최대 (100kT)
2023 ━━━━ 2023 Test (KP) - 최신
```

---

## 라이선스

MIT License

---

## 기여

이 프로젝트는 교육 및 학술 목적으로 제작되었습니다.
데이터 수정이나 추가 건의는 Pull Request를 열어주세요.

---

## DISCLAIMER

본 프로젝트는 공개된 정보를 바탕으로 제작되었으며, 모든 데이터는 추정치입니다.
핵실험의 정치적, 군사적, 인도적 측면에 대해 중립적 시각을 유지합니다.
