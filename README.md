# 댕독 (DogDog) 애견 돌봄 앱

반려견 건강 다이어리, 산책 일정 관리, 주변 시설 정보 제공, 커뮤니티 기능을 갖춘 종합 애견 돌봄 애플리케이션입니다.

## 주요 기능

### 1. 건강 다이어리 (Health Diary)
- 반려견 프로필 관리
- 건강 기록 작성 및 관리
- 사진 앨범 정리

### 2. 산책 일정 (Walk Schedule)
- 실시간 위치 기반 산책 기록
- 산책 시간, 거리 측정
- 산책 일정 관리

### 3. 애견 시설 정보 (Facilities)
- 주변 동물병원, 미용실, 카페 등 정보 제공
- 지도 기반 위치 확인
- 즐겨찾기 기능

### 4. 커뮤니티 (Community)
- 반려견 관련 정보 공유
- 질문과 답변
- 사진 및 경험 공유

## 기술 스택

- React
- TypeScript
- React Router
- Chakra UI
- Leaflet (지도)
- React Icons

## 시작하기

### 설치

```bash
# 저장소 복제
git clone https://github.com/YOOYONGHYUN/ddog-test.git
cd ddog-test

# 의존성 설치
yarn install
# 또는
npm install
```

### 개발 서버 실행

```bash
yarn start
# 또는
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하여 앱을 확인할 수 있습니다.

## 프로젝트 구조

```
ddog-test/
├── public/
├── src/
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── pages/
│   │   ├── DiaryPage.tsx
│   │   ├── WalkPage.tsx
│   │   ├── FacilitiesPage.tsx
│   │   ├── CommunityPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.css
│   ├── reportWebVitals.ts
│   └── theme.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 라이센스

MIT