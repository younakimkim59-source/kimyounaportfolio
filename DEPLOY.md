# Firebase 배포 가이드

## 배포 전 정리

Firebase 배포 전에 다음 파일/폴더를 정리하세요:

### 자동 정리 (권장)

**Windows:**
```bash
clean-firebase.bat
```

**Mac/Linux:**
```bash
chmod +x clean-firebase.sh
./clean-firebase.sh
```

### 수동 정리

다음 파일/폴더를 수동으로 삭제하세요:

1. **`.firebase/`** 폴더 - Firebase 배포 캐시
2. **`firebase-debug.log`** - Firebase 디버그 로그
3. **`firebase-debug.*.log`** - 기타 디버그 로그 파일들

## 배포 방법

### 1. Firebase CLI 설치 확인
```bash
firebase --version
```

### 2. Firebase 로그인
```bash
firebase login
```

### 3. 배포 전 정리 실행
```bash
# Windows
clean-firebase.bat

# Mac/Linux
./clean-firebase.sh
```

### 4. 배포 실행
```bash
firebase deploy
```

또는 호스팅만 배포:
```bash
firebase deploy --only hosting
```

## 배포 후 확인

배포가 완료되면 Firebase Console에서 제공하는 URL로 접속하여 확인하세요.

## 주의사항

- `.firebaserc`와 `firebase.json` 파일은 **삭제하지 마세요**. 이 파일들은 Firebase 설정 파일입니다.
- `firebase-config.js` 파일도 **삭제하지 마세요**. 이 파일은 Firebase 연결 설정 파일입니다.

