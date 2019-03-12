# docker build -t springbootapp .
# docker run -t springbootapp
FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY target/chatbot-0.0.1-SNAPSHOT.jar chatbot-0.0.1-SNAPSHOT.jar
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/chatbot-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080:8080