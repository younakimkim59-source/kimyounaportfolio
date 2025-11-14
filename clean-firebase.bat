@echo off
echo Firebase 배포 전 정리 중...
echo.

REM .firebase 폴더 삭제
if exist .firebase (
    echo .firebase 폴더 삭제 중...
    rmdir /s /q .firebase
    echo .firebase 폴더가 삭제되었습니다.
) else (
    echo .firebase 폴더가 없습니다.
)

REM firebase-debug.log 파일 삭제
if exist firebase-debug.log (
    echo firebase-debug.log 파일 삭제 중...
    del /q firebase-debug.log
    echo firebase-debug.log 파일이 삭제되었습니다.
) else (
    echo firebase-debug.log 파일이 없습니다.
)

REM firebase-debug.*.log 파일 삭제
for %%f in (firebase-debug.*.log) do (
    if exist %%f (
        echo %%f 파일 삭제 중...
        del /q %%f
        echo %%f 파일이 삭제되었습니다.
    )
)

echo.
echo 정리 완료!
echo 이제 'firebase deploy' 명령어로 배포할 수 있습니다.
pause

