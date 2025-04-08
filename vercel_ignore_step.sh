#!/bin/bash

# HEAD^ 존재 여부 체크 (shallow clone 대응)
if ! git rev-parse HEAD^ >/dev/null 2>&1; then
  echo "No previous commit found. Proceeding with deployment."
  exit 0
fi

# client 디렉토리 변경 여부 확인
if git diff --quiet HEAD^ HEAD ./client; then
  echo "No changes in ./client. Skipping deployment."
  exit 1
else
  echo "Changes detected in ./client. Proceeding with deployment."
  exit 0
fi
