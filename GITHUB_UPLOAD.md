# GitHub 저장소 업로드 가이드

## 빠른 업로드 방법

### Windows 사용자
`upload-to-github.bat` 파일을 더블클릭하여 실행하세요.

### Mac/Linux 사용자
터미널에서 다음 명령어를 실행하세요:
```bash
chmod +x upload-to-github.sh
./upload-to-github.sh
```

## 수동 업로드 방법

### 1. Git 초기화 및 원격 저장소 연결

터미널에서 다음 명령어를 순서대로 실행하세요:

```bash
# Git 저장소 초기화
git init

# 원격 저장소 추가
git remote add origin https://github.com/younakimkim59-source/kimyounaportfolio.git

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: flipTURN portfolio website"

# 메인 브랜치로 이름 변경 (필요한 경우)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 2. 인증 문제 해결

GitHub에 푸시할 때 인증이 필요할 수 있습니다:

### Personal Access Token 사용 (권장)
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" 클릭
3. 필요한 권한 선택 (repo)
4. 토큰 생성 후 복사
5. 푸시 시 비밀번호 대신 토큰 사용

### 또는 SSH 키 사용
```bash
# SSH 키로 원격 저장소 변경
git remote set-url origin git@github.com:younakimkim59-source/kimyounaportfolio.git
```

## 3. 이후 업데이트

코드를 수정한 후:

```bash
git add .
git commit -m "업데이트 내용 설명"
git push
```

