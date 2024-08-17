#FROM openjdk:17
#ARG JAR_FILE=build/libs/React-0.0.1-SNAPSHOT.jar
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT [ "java", "-jar", "app.jar" ]
# 1. Node.js 환경에서 빌드
FROM node:18 AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json을 복사하고, 의존성 설치
COPY package*.json ./
RUN npm install

# 4. 애플리케이션 소스 복사 및 빌드
COPY . .
RUN npm run build

# 5. Nginx를 사용하여 정적 파일을 서빙
FROM nginx:alpine

# 6. Nginx 설정 파일 복사
COPY ./nginx.conf /etc/nginx/nginx.conf

# 7. 빌드된 파일을 Nginx의 기본 웹 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 8. 컨테이너가 시작될 때 Nginx 실행
CMD ["nginx", "-g", "daemon off;"]

# 9. 80 포트 오픈
EXPOSE 80
