# Stage 1: Build using Maven and JDK 21
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2: Run using JRE 21 (Lightweight)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]git 