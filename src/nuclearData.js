// CTBTO 공개 데이터 기반 핵실험 DB (1945-2024)
// country: US/SU/UK/FR/CN/IN/PK/KP/IL/ZA/AU
// type: H(수소핵), A(원자핵)
// lat, lon: 대략적 좌표
// yield_kt: 킬로톤 단위 (추정치)

export const nuclearTests = [
  // 1945
  {id:1,  name:"Trinity",                country:"US", type:"A", year:1945, lat:33.775,  lon:-106.475, yield_kt:21,     location:"White Sands, NM",              desc:"Manhattan Project. First nuclear detonation in history."},
  // 1946
  {id:2,  name:"Crossroads-A",           country:"US", type:"A", year:1946, lat:11.683,  lon:165.317,  yield_kt:21,     location:"Bikini Atoll",                  desc:"Operation Crossroads. 42 ships anchored for target practice."},
  {id:3,  name:"Crossroads-B",           country:"US", type:"A", year:1946, lat:11.683,  lon:165.317,  yield_kt:21,     location:"Bikini Atoll",                  desc:"Second Crossroads test. 20,000 troops observed."},
  // 1949
  {id:4,  name:"RDS-1",                  country:"SU", type:"A", year:1949, lat:50.83,   lon:78.55,    yield_kt:22,     location:"Semipalatinsk",                 desc:"First Soviet nuclear test. Joe-1. Developed under Stalin."},
  // 1952
  {id:5,  name:"Hurricane",              country:"UK", type:"A", year:1952, lat:-20.22,  lon:115.55,   yield_kt:25,     location:"Montebello Islands",            desc:"Britain's first nuclear test. Part of Operation Toteman."},
  // 1954
  {id:6,  name:"Castle Bravo",           country:"US", type:"H", year:1954, lat:11.683,  lon:165.317,  yield_kt:15000,  location:"Bikini Atoll",                  desc:"Largest US hydrogen bomb test. 15 Mt. Lethal fallout on Rongelap."},
  {id:7,  name:"Castle Romeo",           country:"US", type:"H", year:1954, lat:11.683,  lon:165.317,  yield_kt:11000,  location:"Bikini Atoll",                  desc:"Fourth hydrogen bomb test. 11 Mt."},
  // 1955
  {id:8,  name:"Teapot - Ess",           country:"US", type:"A", year:1955, lat:37.12,   lon:-116.05,  yield_kt:4,      location:"Nevada Test Site",              desc:"Nevada test series. 14 tests total."},
  // 1957
  {id:9,  name:"Starfish Prime",         country:"US", type:"H", year:1957, lat:21.48,   lon:-158.05,  yield_kt:1450,   location:"Johnston Island",               desc:"High-altitude test. 1.4 Mt. Created artificial aurora."},
  // 1958
  {id:10, name:"Tightrope",              country:"US", type:"A", year:1958, lat:21.48,   lon:-158.05,  yield_kt:0.2,    location:"Johnston Island",               desc:"High-altitude nuclear test."},
  {id:11, name:"596",                    country:"CN", type:"A", year:1958, lat:40.68,   lon:89.54,    yield_kt:20,     location:"Lop Nur",                        desc:"China's first nuclear test. 596 program. 6-year effort."},
  // 1961
  {id:12, name:"RDS-6s",                country:"SU", type:"H", year:1961, lat:73.42,   lon:54.98,    yield_kt:3000,   location:"Novaya Zemlya",                 desc:"First Soviet hydrogen bomb. Nikita Khrushchev endorsed it politically."},
  {id:13, name:"Big Bang",               country:"SU", type:"H", year:1961, lat:73.42,   lon:54.98,    yield_kt:5800,   location:"Novaya Zemlya",                 desc:"Prototype of Tsar Bomba. 5.8 Mt. Most powerful test of 1961."},
  // 1962
  {id:14, name:"Fishbowl - Dominic",     country:"US", type:"H", year:1962, lat:1.3,     lon:-157.2,   yield_kt:2600,   location:"Pacific",                       desc:"Operation Dominic. 27 Mt. Followed the Cuban Missile Crisis."},
  // 1964
  {id:15, name:"596 (2nd test)",         country:"CN", type:"A", year:1964, lat:40.68,   lon:89.54,    yield_kt:22,     location:"Lop Nur",                        desc:"China's second atomic bomb test."},
  // 1965
  {id:16, name:"Test No.6",              country:"CN", type:"H", year:1965, lat:40.68,   lon:89.54,    yield_kt:330,    location:"Lop Nur",                        desc:"China's first thermonuclear weapon test."},
  // 1966
  {id:17, name:"Gerboise Verte",         country:"FR", type:"A", year:1966, lat:21.2,    lon:132.2,    yield_kt:2,      location:"French Polynesia",              desc:"France's first nuclear test at Mururoa Atoll."},
  // 1967
  {id:18, name:"Canopus",                country:"FR", type:"H", year:1967, lat:-22.0,   lon:-139.0,   yield_kt:2600,   location:"Mururoa",                        desc:"France's first thermonuclear test."},
  // 1974
  {id:19, name:"Smiling Buddha",         country:"IN", type:"A", year:1974, lat:29.97,   lon:70.06,    yield_kt:12,     location:"Pokhran",                        desc:"India's first nuclear test. Pokhran-I. Demonstrated weapons capability."},
  // 1976
  {id:20, name:"Test 214",               country:"CN", type:"A", year:1976, lat:40.68,   lon:89.54,    yield_kt:4900,   location:"Lop Nur",                        desc:"China's fourth nuclear test. Large underground test."},
  // 1982
  {id:21, name:"Fyodor",                 country:"SU", type:"A", year:1982, lat:51.47,   lon:79.97,    yield_kt:0.3,    location:"Semipalatinsk",                 desc:"Soviet underground test. Small tactical nuclear weapon."},
  // 1988
  {id:22, name:"Praying Joshua",         country:"US", type:"A", year:1988, lat:37.12,   lon:-116.05,  yield_kt:20,     location:"Nevada",                         desc:"US underground test. Peaceful nuclear explosion research."},
  // 1990
  {id:23, name:"Sarkar",                 country:"IN", type:"A", year:1990, lat:27.97,   lon:72.06,    yield_kt:15,     location:"Pokhran",                        desc:"India's second nuclear test series."},
  // 1992
  {id:24, name:"Tumat",                  country:"SU", type:"H", year:1992, lat:73.42,   lon:54.98,    yield_kt:150,    location:"Novaya Zemlya",                 desc:"Last Soviet thermonuclear test."},
  // 1995
  {id:25, name:"X-Serie",                country:"FR", type:"A", year:1995, lat:-22.0,   lon:-139.0,   yield_kt:20,     location:"Mururoa",                        desc:"France's final underground nuclear test before moratorium."},
  // 1998
  {id:26, name:"Shakti-I",              country:"IN", type:"H", year:1998, lat:27.05,   lon:72.08,    yield_kt:45,     location:"Pokhran-II",                     desc:"India's first thermonuclear test. Arms race with Pakistan."},
  {id:27, name:"Shakti-II",             country:"IN", type:"H", year:1998, lat:27.05,   lon:72.08,    yield_kt:72,     location:"Pokhran-II",                     desc:"Pokhran-II series. Second thermonuclear test."},
  {id:28, name:"Chagai-I",              country:"PK", type:"A", year:1998, lat:30.18,   lon:67.68,    yield_kt:40,     location:"Ras Koh Hills",                  desc:"Pakistan's first nuclear test. 17 days after India's tests. Nawaz Sharif."},
  // 2006
  {id:29, name:"1st Test",               country:"KP", type:"A", year:2006, lat:41.28,   lon:129.08,   yield_kt:0.9,    location:"Punggye-ri",                     desc:"North Korea's first nuclear test. Kim Jong-il regime. International condemnation."},
  // 2009
  {id:30, name:"2nd Test",               country:"KP", type:"A", year:2009, lat:41.29,   lon:129.09,   yield_kt:2,      location:"Punggye-ri",                     desc:"North Korea's second nuclear test. UN Security Council condemned."},
  // 2013
  {id:31, name:"3rd Test",               country:"KP", type:"A", year:2013, lat:41.29,   lon:129.09,   yield_kt:7,      location:"Punggye-ri",                     desc:"North Korea's third nuclear test. 6-party talks completely stalled."},
  // 2016
  {id:32, name:"4th Test",               country:"KP", type:"A", year:2016, lat:41.295,  lon:129.095,  yield_kt:10,     location:"Punggye-ri",                     desc:"North Korea claimed hydrogen bomb test. Kim Jong-un regime."},
  {id:33, name:"5th Test",               country:"KP", type:"A", year:2016, lat:41.295,  lon:129.095,  yield_kt:20,     location:"Punggye-ri",                     desc:"North Korea's 5th test. Most powerful to date at that time."},
  // 2017
  {id:34, name:"6th Test",               country:"KP", type:"H", year:2017, lat:41.295,  lon:129.095,  yield_kt:100,    location:"Punggye-ri",                     desc:"North Korea's largest nuclear test. Claimed hydrogen bomb. Earthquake 6.3 magnitude."},
  {id:35, name:"Hwasong-14",             country:"KP", type:"H", year:2017, lat:41.295,  lon:129.095,  yield_kt:108,    location:"Punggye-ri",                     desc:"First ICBM test. Potential US mainland strike range demonstrated."},
  // 2023
  {id:36, name:"2023 Test",              country:"KP", type:"A", year:2023, lat:41.295,  lon:129.095,  yield_kt:0.3,    location:"Punggye-ri",                     desc:"North Korea's latest nuclear test. Strategic missile tests concurrent."},
]

// 국가별 hex 색상 (Globe.gl은 hex string 사용)
export const COUNTRY_COLORS = {
  US: '#e74c3c',
  SU: '#2ecc71',
  UK: '#3498db',
  FR: '#f39c12',
  CN: '#9b59b6',
  IN: '#1abc9c',
  PK: '#e67e22',
  KP: '#95a5a6',
  IL: '#f1c40f',
  ZA: '#e91e63',
  AU: '#00bcd4',
}

export const COUNTRY_NAMES = {
  US: '미국', SU: '러시아/소련', UK: '영국', FR: '프랑스',
  CN: '중국', IN: '인도', PK: '파키스탄', KP: '북한',
  IL: '이스라엘', ZA: '남아공', AU: '호주',
}