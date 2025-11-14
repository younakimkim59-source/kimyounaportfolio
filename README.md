# flipTURN Portfolio

flipTURN 개인 포트폴리오 웹사이트

## 프로젝트 소개

따뜻한 감성과 일상의 편리함을 잇는 Web/App Creator, flipTURN의 포트폴리오 웹사이트입니다.

## 주요 기능

- **포트폴리오 소개**: 프로젝트 및 경력 소개
- **게시판**: Firebase Firestore를 활용한 게시글 CRUD 기능
- **댓글 시스템**: 게시글별 댓글 작성 및 조회
- **반응형 디자인**: 모바일 및 데스크톱 최적화

## 기술 스택

- HTML5, CSS3, JavaScript
- Firebase (Hosting, Firestore, Storage)
- Quill.js (WYSIWYG 에디터)

## 설치 및 실행

### 로컬 개발

```bash
# 의존성 설치
npm install

# 로컬 서버 실행
npm start
# 또는
python -m http.server 8000
```

### Firebase 배포

```bash
# Firebase 로그인
firebase login

# 배포
firebase deploy
```

## 프로젝트 구조

```
kimyounaportfolio/
├── public/              # Firebase Hosting 배포 폴더
│   ├── index.html       # 메인 페이지
│   ├── script.js        # JavaScript 로직
│   ├── styles.css       # 스타일시트
│   ├── write.html       # 게시글 작성 페이지
│   ├── firebase-config.js
│   ├── image/           # 이미지 파일
│   └── 이력서2025.pdf   # 이력서 파일
├── firebase.json        # Firebase 설정
├── firestore.rules      # Firestore 보안 규칙
└── package.json         # 프로젝트 설정
```

## 주요 기능 설명

### 게시판
- 게시글 작성, 수정, 삭제
- 카테고리별 분류
- 페이지네이션
- 작성자 기반 권한 관리

### 댓글 시스템
- 게시글별 댓글 작성
- 실시간 댓글 목록 조회
- 상대 시간 표시

## 라이선스

MIT

## 작성자

flipTURN (김유나)
