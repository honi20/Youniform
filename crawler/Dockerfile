# Step 1: 베이스 이미지 설정
FROM python:3.9-slim

# Step 2: 작업 디렉토리 생성 및 설정
WORKDIR /

# Step 3: 필요한 파일 복사
COPY requirements.txt requirements.txt

# Step 4: 필요한 Python 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: 애플리케이션 소스 코드 복사
COPY . /

# Step 6: Celery 실행
CMD ["celery", "-A", "app", "worker", "-c", "5", "--loglevel=info", "-Q", "KBO"]
