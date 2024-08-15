# 프로젝트 아키텍처

![아키텍처](img/아키택처.png)

## 1. 사용 도구

- **이슈 관리**: Jira
- **형상 관리**: GitLab
- **커뮤니케이션**: Notion, MatterMost
- **디자인**: Figma
- **CI/CD**: Jenkins

## 2. 개발 도구

| IDE |
| --- |
| Intellij IDEA Ultimate |
| Visual Studio Code |
| Pycharm Professional |
| MoBaXterm |

## 3. 개발 환경

### Frontend

| 사용 기술 | 버전 |
| --- | --- |
| React | 18.3.1 |
| Node | 20.15.0 |
| npm | 10.7.0 |

기타 정보는 `/frontend/youniform/package.json` 확인

### Backend

| 사용 기술 | 버전 |
| --- | --- |
| Java | 21 |
| Spring Boot | 3.3.2 |
| Gradle | 8.8 |

기타 정보는 `/backend/youniform/build.gradle` 확인

### Crawler

| 사용 기술 | 버전 |
| --- | --- |
| Python | 3.9.19 |

기타 정보는 `/crawler/requirements.txt` 확인

### Infra

| 사용 기술 | 버전 |
| --- | --- |
| AWS | |
| MariaDB | 11.4.3-MariaDB-ubu2404 |
| MongoDB | 20.15.1 |
| Redis | 7.4.0 |
| Nginx | 1.27.0 |
| Ubuntu | 20.04.6 |
| Jenkins | 2.454 |
| Docker | 27.1.1 |

## 4. 환경변수

### Backend

- `application.yml`

```yaml
spring:
  application:
    name: api
  config:
    import:
      - classpath:jwt.yml
  profiles:
    active: ${PROFILE}
  servlet:
    multipart:
      max-file-size: 20MB
      max-request-size: 20MB
  mail:
    host: smtp.gmail.com
    port: 587
    username: ${GOOGLE_USER_NAME}
    password: ${GOOGLE_PASSWORD}
    properties:
      mail:
        smtp:
          auth: true
          timeout: 5000
          starttls:
            enable: true
cloud:
  aws:
    s3:
      bucket: ${S3_BUCKET}
    stack:
      auto: false
    region:
      static: ap-northeast-2
    credentials:
      accessKey: ${S3_ACCESSKEY}
      secretKey: ${S3_SECRETKEY}

server:
  tomcat:
    max-http-form-post-size: 20MB
spring:
  config:
    activate:
      on-profile: prod

  datasource:
    driver-class-name: org.mariadb.jdbc.Driver
    url: ${RDS_URL}
    username: ${RDS_USERNAME}
    password: ${RDS_PASSWORD}
    hikari:
      minimum-idle: 5
      maximum-pool-size: 150
      idle-timeout: 600000
      connection-timeout: 30000
      max-lifetime: 1800000

  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: false
        dialect: org.hibernate.dialect.MariaDBDialect

  data:
    mongodb:
      uri: ${MONGODB_URL}
      username: ${MONGODB_USERNAME}
      password: ${MONGODB_PASSWORD}

    redis:
      port: 6379
      host: ${REDIS_HOST}
logging:
  level:
    org.springframework.security: DEBUG
    com.youniform.api: INFO
jwt:
  secret: ${JWT_SECRET}

  access:
    expiration: 300 # 5분

  refresh:
    expiration: 1209600 # 2주

spring:
  security:
    oauth2:
      client:
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id
          naver:
            authorization-uri: https://nid.naver.com/oauth2.0/authorize
            token-uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user-name-attribute: response
          google:
            authorization-uri: https://accounts.google.com/o/oauth2/auth
            token-uri: https://oauth2.googleapis.com/token
            user-info-uri: https://openidconnect.googleapis.com/v1/userinfo
            user-name-attribute: sub
        registration:
          kakao:
            client-id: ${KAKAO_ID}
            client-secret: ${KAKAO_SECRET}
            client-authentication-method: client_secret_post
            redirect-uri: ${KAKAO_REDIRECT}
            authorization-grant-type: authorization_code
            client-name: kakao
            scope:
              - profile_nickname
              - profile_image
              - account_email
          naver:
            client-id: ${NAVER_ID}
            client-secret: ${NAVER_SECRET}
            redirect-uri: ${NAVER_REDIRECT}
            client-name: Naver
            authorization-grant-type: authorization_code
            scope:
              - email
              - profile_image
              - name
          google:
            client-id: ${GOOGLE_ID}
            client-secret: ${GOOGLE_SECRET}
            redirect-uri: ${GOOGLE_REDIRECT}
            authorization-grant-type: authorization_code
            client-name: google
            scope:
              - email
              - profile
```

- `application.properties`
```
RDS_URL=jdbc:mariadb://maria_db:3306/S11P13A308?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8
RDS_USERNAME=S11P13A308
RDS_PASSWORD=Pvp9^RHKBt5TH2e+m1O#

# MongoDB Properties
MONGODB_URL=mongodb+srv://S11P13A308:B_DA7_4aVA_c%2B-srzB%23*@ssafy.ngivl.mongodb.net/S11P13A308?authSource=admin
MONGODB_USERNAME=S11P13A308
MONGODB_PASSWORD=B_DA7_4aVA_c+-srzB#*

# AWS S3 Properties
S3_BUCKET=youniforms3
S3_ACCESSKEY=AKIAQFC27D2K3KPEKMLT
S3_SECRETKEY=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

# JWT (JSON Web Token) Properties
JWT_SECRET=28e6bfff4fa7daa1c3d7ccb69df3e797e9e2f32c2cd90ffd760a0e14e65a7bcda122ac5b7e5f50179aa476d42d5cfaccefaf7e256eaa411b73b4b54d82abcaf1
REDIS_HOST=i11a308.p.ssafy.io

# kakao client
KAKAO_ID=94fbb9c09f08d5a0eacb9ec670c8b54b
KAKAO_SECRET=saGAxeqLScVeviioiIQolVDFxrS7mFZ5
KAKAO_REDIRECT=https://youniform.site/api/users/oauth2/code/kakao

# naver client
NAVER_ID=PwdZFosPz79OKyNuA7O1
NAVER_SECRET=zL6ls62w17
NAVER_REDIRECT=https://youniform.site/api/users/oauth2/code/naver

# gogle client
GOOGLE_ID=619957230797-por0egi2q7id93e2rpdd9eulrrvu1l7k.apps.googleusercontent.com
GOOGLE_SECRET=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
GOOGLE_REDIRECT=https://youniform.site/api/users/oauth2/code/google

GOOGLE_USER_NAME=palette.youniform@gmail.com
GOOGLE_PASSWORD=axbvechzwydlynlc

UPLOAD_URL=${UPLOAD_URL}
BUCKET_URL=https://youniforms3.s3.ap-northeast-2.amazonaws.com/
CLOUD_FRONT=https://dsfjel9nvktdp.cloudfront.net/
```
### Frontend

- .env
```
VITE_API_URL=https://youniform.site/api
VITE_NEWS_URL=https://openapi.naver.com/v1/search/news.json
VITE_NAVER_CLIENT_ID=PwdZFosPz79OKyNuA7O1
VITE_NAVER_CLIENT_SECRET=zL6ls62w17
VITE_HOST=openapi.naver.com
VITE_KAKAO_URL=https://youniform.site/api/users/signin/social/kakao
VITE_GOOGLE_URL=https://youniform.site/api/users/signin/social/google
VITE_NAVER_URL=https://youniform.site/api/users/signin/social/naver
```

## 5. CI/CD 구축

1. **Docker 설치**
2. **Jenkins 컨테이너 생성**
   - 도커 소켓 마운트 필수
3. **nginx 컨테이너 생성**
   - https를 위한 pem키가 있는 디렉토리 마운트 필수

## 6. 빌드 및 실행

서버상에 Docker가 설치되어있는 가정하에 진행.

### 1. Jenkins 컨테이너 실행

```bash
sudo docker run -d -p 8080:8080 \
    -v /home/ubuntu/jenkins-data:/var/jenkins_home \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --name jenkins \
    jenkins/jenkins2.454-jdk21
```
### 2. jenkins backend pipeline 실행
```
pipeline {
    agent any

    tools {
        gradle 'Default Gradle' // Jenkins Global Tool Configuration에서 설정한 Gradle 설치 이름
    }

    environment {
        GIT_CREDENTIALS_ID = 'gitlab_access_token_credentials' // Jenkins의 자격 증명 ID
        GITLAB_REPO_URL = 'https://lab.ssafy.com/s11-webmobile2-sub2/S11P12A308.git' // GitLab 프로젝트 URL
        DOCKER_IMAGE_NAME = 'api' // Docker Image 이름
        WORKSPACE = pwd()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // GitLab 리포지토리를 클론하고 develop-be 브랜치로 체크아웃
                    git branch: 'develop-be', url: "${GITLAB_REPO_URL}", credentialsId: "${GIT_CREDENTIALS_ID}"
                }
            }
        }
        
        stage('Set Environment Variables') {
            steps {
                script {
                    sh """sed -i 's/\${PROFILE}/prod/g' ${WORKSPACE}/backend/youniform/src/main/resources/application.yml"""
                    sh """sed -i 's/localhost/redis/g' ${WORKSPACE}/backend/youniform/src/main/resources/application.yml"""
                    sh """sed -i 's;\$serverUrl;${serverUrl};g' ${WORKSPACE}/backend/youniform/build.gradle"""
                    
                    def propertiesContent = """
                        RDS_URL=${RDS_URL}
                        RDS_USERNAME=${RDS_USERNAME}
                        RDS_PASSWORD=${RDS_PASSWORD}
                        # MongoDB Properties
                        MONGODB_URL=${MONGODB_URL}
                        MONGODB_USERNAME=${MONGODB_USERNAME}
                        MONGODB_PASSWORD=${MONGODB_PASSWORD}
                        # AWS S3 Properties
                        S3_BUCKET=${S3_BUCKET}
                        S3_ACCESSKEY=${S3_ACCESSKEY}
                        S3_SECRETKEY=${S3_SECRETKEY}
                        # JWT (JSON Web Token) Properties
                        JWT_SECRET=${JWT_SECRET}
                        REDIS_HOST=${REDIS_HOST}
                        # kakao client
                        KAKAO_ID=${KAKAO_ID}
                        KAKAO_SECRET=${KAKAO_SECRET}
                        KAKAO_REDIRECT=${KAKAO_REDIRECT}
                        #KAKAO_REDIRECT=http://localhost:8080/users/signin/social/kakao
                        # naver client
                        NAVER_ID=${NAVER_ID}
                        NAVER_SECRET=${NAVER_SECRET}
                        NAVER_REDIRECT=${NAVER_REDIRECT}
                        #NAVER_REDIRECT=http://localhost:8080/users/signin/social/naver
                        # gogle client
                        GOOGLE_ID=${GOOGLE_ID}
                        GOOGLE_SECRET=${GOOGLE_SECRET}
                        GOOGLE_REDIRECT=${GOOGLE_REDIRECT}
                        #GOOGLE_REDIRECT=http://localhost:8080/users/signin/social/google
                        GOOGLE_USER_NAME=${GOOGLE_USER_NAME}
                        GOOGLE_PASSWORD=${GOOGLE_PASSWORD}
                        
                        UPLOAD_URL=${UPLOAD_URL}
                        BUCKET_URL=${BUCKET_URL}
                        CLOUD_FRONT=${CLOUD_FRONT}
                    """.stripIndent()
                    
                    writeFile file: "${WORKSPACE}/backend/youniform/src/main/resources/application.properties", text: propertiesContent
                }
            }
        }

        stage('Build') {
            steps {
                dir('backend/youniform') {
                    // Gradle Wrapper가 존재하는지 확인
                    sh 'if [ ! -f gradlew ]; then echo "Gradle Wrapper not found"; exit 1; fi'
                    
                    // Gradle Wrapper에 실행 권한을 부여합니다.
                    sh 'chmod +x gradlew'
                    
                    echo 'Building Spring Boot application...'
                    sh './gradlew clean bootBuildImage' // Gradle 빌드 실행
                }
            }
        }
        stage('Create Docker Compose File') {
            steps {
                script {
                    def dockerComposeContent = """
                    services:
                       redis:
                             image: redis:latest
                             container_name: redis
                             ports:
                                 - "6379:6379"  # Redis의 기본 포트는 6379입니다
                             networks:
                                 - bridge_network
                        boot:
                            image: api:0.0.1-SNAPSHOT
                            container_name: boot
                            user: "1000:1000"
                            ports:
                              - "8080:8080"
                            environment:
                              SPRING_REDIS_HOST: redis
                              SPRING_REDIS_PORT: 6379
                              TZ: "Asia/Seoul"
                            networks:
                              - bridge_network
                            volumes:
                              - ./shared:/shared
                            depends_on:
                              - redis
                        maria_db:
                            image: mariadb:latest
                            container_name: maria_db
                            environment:
                                  - TZ="Asia/Seoul"
                                    - ALLOW_EMPTY_PASSWORD=no
                                - MARIADB_ROOT_PASSWORD=${RDS_PASSWORD}
                                - MARIADB_USER=${RDS_USERNAME}
                                - MARIADB_DATABASE=${RDS_USERNAME}
                                - MARIADB_PASSWORD=${RDS_PASSWORD}
                             ports:
                                - "3306:3306"
                             networks:
                               - bridge_network
                        
                    networks:
                        bridge_network:
                            driver: bridge
                    """.stripIndent()

                    writeFile file: "${WORKSPACE}/backend/youniform/docker-compose.yml", text: dockerComposeContent
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('backend/youniform') {
                    script {
                        echo "Deploying Docker containers using Docker Compose..."
                        
                        // 기존 컨테이너가 있다면 삭제
                        try {
                            sh "docker-compose down"
                        } catch (Exception e) {
                            echo "Error stopping containers: ${e.message}"
                        }
                        
                        // Docker Compose로 컨테이너 실행
                        sh "docker-compose up -d"
                    }
                }
            }
        }
    }
}
```
### 3. jenkins frontend pipeline 실행
```
pipeline {
    agent any
    
    tools {
        nodejs 'nodejs' // Jenkins Global Tool Configuration에서 설정한 Gradle 설치 이름
    }

    environment {
        GIT_CREDENTIALS_ID = 'gitlab_access_token_credentials' // Jenkins의 자격 증명 ID
        GITLAB_REPO_URL = 'https://lab.ssafy.com/s11-webmobile2-sub2/S11P12A308.git' // GitLab 프로젝트 URL
        DOCKER_IMAGE_NAME = 'front' // Docker Image 이름
        WORKSPACE = pwd()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // GitLab 리포지토리를 클론하고 develop-be 브랜치로 체크아웃
                    git branch: 'develop-fe', url: "${GITLAB_REPO_URL}", credentialsId: "${GIT_CREDENTIALS_ID}"
                }
            }
        }
        
        stage('Set Environment Variables') {
            steps {
                script {
                    def propertiesContent = """
                        VITE_API_URL=${SERVER_URL}
                        VITE_NEWS_URL=${NAVER_NEWS}
                        VITE_NAVER_CLIENT_ID=${NAVER_ID}
                        VITE_NAVER_CLIENT_SECRET=${NAVER_CLIENT_SECRET}
                        VITE_HOST=${NAVER_HOST}
                        VITE_KAKAO_URL=${KAKAO_URL}
                        VITE_GOOGLE_URL=${GOOGLE_URL}
                        VITE_NAVER_URL=${NAVER_URL}
                    """.stripIndent()
                    
                    writeFile file: "${WORKSPACE}/frontend/youniform/.env", text: propertiesContent
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend/youniform') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('frontend/youniform') {
                    sh 'npm run build'
                }
            }
        }
        
       stage('Deploy to Nginx') {
            steps {
                dir('frontend/youniform') {
                    script {
                        // 빌드된 파일을 Nginx 컨테이너의 HTML 디렉토리로 복사
                        sh '''
                        docker cp ./dist/. nginx_https:/usr/share/nginx/html/
                        '''
                    }
                }
            }
        }
    }
}
```

### 4. jenkins crawler pipeline 실행
```
pipeline {
    agent any

    environment {
        GIT_CREDENTIALS_ID = 'gitlab_access_token_credentials' // Jenkins의 자격 증명 ID
        GITLAB_REPO_URL = 'https://lab.ssafy.com/s11-webmobile2-sub2/S11P12A308.git' // GitLab 프로젝트 URL
        WORKSPACE = pwd()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // GitLab 리포지토리를 클론하고 develop-be 브랜치로 체크아웃
                    git branch: 'develop-crawler', url: "${GITLAB_REPO_URL}", credentialsId: "${GIT_CREDENTIALS_ID}"
                }
            }
        }

        stage('Build') {
            steps {
                dir('crawler/') {
                    sh 'pwd'
                    sh 'docker build -t kbo .'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('crawler/') {
                    script {
                        echo "Deploying Docker containers using Docker Compose..."
                        
                        // 기존 컨테이너가 있다면 삭제
                        try {
                            sh "docker-compose down"
                        } catch (Exception e) {
                            echo "Error stopping containers: ${e.message}"
                        }
                        
                        // Docker Compose로 컨테이너 실행
                        sh "docker-compose up -d"
                    }
                }
            }
        }
    }
}
```

## 7. 외부 서비스 사용

- kbo 문자중계
- kakao, naver, google oauth 로그인
- 네이버 뉴스 api
