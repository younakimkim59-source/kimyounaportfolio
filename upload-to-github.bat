@echo off
echo ========================================
echo GitHub 저장소 업로드 스크립트
echo ========================================
echo.

REM Git 설치 확인
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] Git이 설치되어 있지 않습니다.
    echo Git을 설치해주세요: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [1/6] Git 저장소 초기화 중...
if exist .git (
    echo .git 폴더가 이미 존재합니다. 건너뜁니다.
) else (
    git init
    if %errorlevel% neq 0 (
        echo [오류] Git 초기화 실패
        pause
        exit /b 1
    )
    echo Git 저장소가 초기화되었습니다.
)

echo.
echo [2/6] 원격 저장소 설정 중...
git remote remove origin 2>nul
git remote add origin https://github.com/younakimkim59-source/kimyounaportfolio.git
if %errorlevel% neq 0 (
    echo [오류] 원격 저장소 설정 실패
    pause
    exit /b 1
)
echo 원격 저장소가 설정되었습니다.

echo.
echo [3/6] 파일 추가 중...
git add .
if %errorlevel% neq 0 (
    echo [오류] 파일 추가 실패
    pause
    exit /b 1
)
echo 모든 파일이 추가되었습니다.

echo.
echo [4/6] 커밋 중...
git commit -m "Initial commit: flipTURN portfolio website"
if %errorlevel% neq 0 (
    echo [경고] 커밋 실패 또는 변경사항이 없습니다.
)

echo.
echo [5/6] 메인 브랜치 설정 중...
git branch -M main 2>nul
echo 메인 브랜치가 설정되었습니다.

echo.
echo [6/6] GitHub에 푸시 중...
echo.
echo 주의: GitHub 인증이 필요할 수 있습니다.
echo Personal Access Token을 사용하거나 SSH 키를 설정해주세요.
echo.
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [오류] 푸시 실패
    echo.
    echo 인증 문제일 수 있습니다. 다음을 확인해주세요:
    echo 1. GitHub Personal Access Token 생성
    echo 2. 또는 SSH 키 설정
    echo.
    echo 자세한 내용은 GITHUB_UPLOAD.md 파일을 참고하세요.
) else (
    echo.
    echo [성공] GitHub에 업로드되었습니다!
    echo https://github.com/younakimkim59-source/kimyounaportfolio
)

echo.
pause

