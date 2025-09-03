FROM maven:3.9.8-eclipse-temurin-22 AS builder

WORKDIR /app

ARG JAR_FILE=target/*.jar

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src

RUN mvn clean install -DskipTests

FROM eclipse-temurin:22

WORKDIR /app

EXPOSE 9999

COPY .mvn/ .mvn

COPY --from=builder /app/target /app/target

CMD ["java", "-jar", "/app/target/share-plus-0.0.1-SNAPSHOT.jar"]