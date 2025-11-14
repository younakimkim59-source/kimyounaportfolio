#!/bin/bash

echo "Firebase 배포 전 정리 중..."
echo ""

# .firebase 폴더 삭제
if [ -d ".firebase" ]; then
    echo ".firebase 폴더 삭제 중..."
    rm -rf .firebase
    echo ".firebase 폴더가 삭제되었습니다."
else
    echo ".firebase 폴더가 없습니다."
fi

# firebase-debug.log 파일 삭제
if [ -f "firebase-debug.log" ]; then
    echo "firebase-debug.log 파일 삭제 중..."
    rm -f firebase-debug.log
    echo "firebase-debug.log 파일이 삭제되었습니다."
else
    echo "firebase-debug.log 파일이 없습니다."
fi

# firebase-debug.*.log 파일 삭제
for file in firebase-debug.*.log; do
    if [ -f "$file" ]; then
        echo "$file 파일 삭제 중..."
        rm -f "$file"
        echo "$file 파일이 삭제되었습니다."
    fi
done

echo ""
echo "정리 완료!"
echo "이제 'firebase deploy' 명령어로 배포할 수 있습니다."

